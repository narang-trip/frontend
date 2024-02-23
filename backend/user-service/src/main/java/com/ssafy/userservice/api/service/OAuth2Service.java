package com.ssafy.userservice.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.userservice.api.oauth2.exception.AuthNotFoundException;
import com.ssafy.userservice.api.oauth2.exception.InvalidSocialTypeException;
import com.ssafy.userservice.api.oauth2.exception.InvalidTokenException;
import com.ssafy.userservice.api.oauth2.userinfo.KakaoUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.NaverUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.OAuth2UserInfo;
import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.Authority;
import com.ssafy.userservice.db.entity.Role;
import com.ssafy.userservice.db.entity.User;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.db.repository.RoleRepository;
import com.ssafy.userservice.db.repository.UserRepository;
import com.ssafy.userservice.security.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Value;

import java.net.URI;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2Service {
    private final JwtService jwtService;
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoRedirectUri;
    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String kakaoTokenUri;
    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String kakaoUserInfoUri;

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String naverClientId;
    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String naverClientSecret;
    @Value("${spring.security.oauth2.client.registration.naver.redirect-uri}")
    private String naverRedirectUri;
    @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
    private String naverTokenUri;
    @Value("${spring.security.oauth2.client.provider.naver.user-info-uri}")
    private String naverUserInfoUri;


    public User oauth2Login(String provider, String code, HttpServletResponse response){
        // 받은 코드로 토큰 가져오기
        String providerAccessToken = getAccessToken(provider, code);
        // 받은 토큰으로 유저 정보 갖고오기
        OAuth2UserInfo userInfo = getUserInfo(provider, providerAccessToken);
        //DB에 저장하기
        User user = registerUser(userInfo, response);
        log.info("userInfo : {}", user.toString());
        return user;
    }

    private String getAccessToken(String provider, String code){
        log.info("code : {}", code);
        return switch (provider){
            case "kakao" -> getSocialAccessToken(code, kakaoClientId, kakaoClientSecret, kakaoRedirectUri, kakaoTokenUri);
            case "naver" -> getSocialAccessToken(code, naverClientId, naverClientSecret, naverRedirectUri, naverTokenUri);
            default -> throw new InvalidSocialTypeException();
        };
    }

    private String getSocialAccessToken(String code, String clientId, String clientSecret, String redirectUri, String tokenUri) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUri, request, Map.class);
        log.info("getSocialAccessToken에서 response {}", response);

        String accessToken = (String) response.getBody().get("access_token");
        log.info("getSocialAccessToken에서 accessToken {}", accessToken);
        return accessToken;
    }

    public OAuth2UserInfo getUserInfo(String provider, String accessToken){
        String userInfoUri = switch (provider) {
            case "kakao" -> kakaoUserInfoUri;
            case "naver" -> naverUserInfoUri;
            default -> throw new InvalidSocialTypeException();
        };

        Map<String, Object> userInfo = getSocialUserInfo(accessToken, userInfoUri);

        return switch (provider) {
            case "kakao" -> new KakaoUserInfo(userInfo);
            case "naver" -> new NaverUserInfo((Map) userInfo.get("response"));
            default -> throw new InvalidSocialTypeException();
        };
    }

    private Map<String, Object> getSocialUserInfo(String accessToken, String userInfoUri){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<?> httpEntity = new HttpEntity<>(headers);

        URI uri = UriComponentsBuilder.fromUriString(userInfoUri)
                .build()
                .toUri();

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, String.class);

        try {
            return new ObjectMapper().readValue(response.getBody(), Map.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private void setTokensForUser(String userId, HttpServletResponse response, String refreshToken){
        String accessToken = jwtService.createAccessToken(userId);

        jwtService.sendAccessToken(response, accessToken);
        jwtService.sendRefreshToken(response, refreshToken);

        jwtService.updateRefreshToken(userId, refreshToken);
    }

    private User registerUser(OAuth2UserInfo userInfo, HttpServletResponse response){
        String providerId = userInfo.getProviderId();
        UUID uuid = UUID.nameUUIDFromBytes(providerId.getBytes());
        String id = uuid.toString();

        Optional<User> findUser = userRepository.findById(id);
        String refreshToken = jwtService.createRefreshToken();
        User user;

        if (findUser.isEmpty()) { //찾지 못했다면
            log.info("등록되지 않은 사용자입니다.");
            user = registerNewUser(id, userInfo);
            registerNewAuth(id, userInfo, refreshToken);
        }
        else{
            log.info("{}는 등록된 사용자입니다", findUser.get().getNickname());
            user = findUser.get();
            updateExistingAuth(id, refreshToken);
        }
        setTokensForUser(user.getId(), response, refreshToken);
        return user;
    }

    private User registerNewUser(String id, OAuth2UserInfo userInfo) {
        List<Role> userRoles = new ArrayList<>();
        userRoles.add(roleRepository.findByRoleName("여행 초보자"));

        User newUser = User.builder()
                .id(id)
                .nickname(userInfo.getName())
                .gender(userInfo.getGender())
                .ageRange(userInfo.getAgeRange())
                .profile_url(userInfo.getProfileUrl())
                .userRoles(userRoles)
                .build();

        userRepository.save(newUser);
        return newUser;
    }

    private void registerNewAuth(String id, OAuth2UserInfo userInfo, String refreshToken) {
        Auth newAuth = Auth.builder()
                .id(id)
                .email(userInfo.getEmail())
                .name(userInfo.getName())
                .provider(userInfo.getProvider())
                .providerId(userInfo.getProviderId())
                .authority(Authority.USER)
                .refreshToken(refreshToken)
                .build();

        authRepository.save(newAuth);
    }

    private void updateExistingAuth(String id, String refreshToken) {
        Auth existingAuth = authRepository.findById(id)
                .orElseThrow(AuthNotFoundException::new);

        existingAuth.setRefreshToken(refreshToken);
        authRepository.save(existingAuth);
    }

    public void logout(HttpServletRequest request) {
        String accessToken = jwtService.extractAccessToken(request).orElseThrow(InvalidTokenException::new);
        String id = jwtService.extractId(accessToken).orElseThrow(InvalidTokenException::new);
        Auth auth = authRepository.findById(id).orElseThrow(AuthNotFoundException::new);
        auth.setRefreshToken(null);
        authRepository.save(auth);
    }
}
