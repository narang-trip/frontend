package com.ssafy.userservice.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.userservice.api.oauth2.exception.InvalidSocialTypeException;
import com.ssafy.userservice.api.oauth2.userinfo.KakaoUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.OAuth2UserInfo;
import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.Authority;
import com.ssafy.userservice.db.entity.User;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.db.repository.UserRepository;
import com.ssafy.userservice.security.jwt.JwtService;
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
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2Service {
    private final JwtService jwtService;
    private final AuthRepository authRepository;
    private final UserRepository userRepository;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoRedirectUri;
    @Value("${spring.security.oauth2.client.provider.kakao.authorization-uri}")
    private String kakaoAuthorizationUri;
    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String kakaoTokenUri;
    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String kakaoUserInfoUri;


    public String oauth2Login(String provider, String code){
        /*
            받은 코드로 토큰 가져오기
         */
        String providerAccessToken = getAccessToken(provider, code);

        /*
            받은 토큰으로 유저 정보 갖고오기
         */
        OAuth2UserInfo userInfo = getUserInfo(provider, providerAccessToken);

        /*
            DB에 저장하기
         */
        registerUser(userInfo);

        String jwtAccessToken = jwtService.createAccessToken(userInfo.getEmail());
        log.info("oauth2Login에서 jwtAccessToken {}", jwtAccessToken);
        return jwtAccessToken;
    }

    private String getAccessToken(String provider, String code){
        return switch (provider){
            case "kakao" -> getKakaoAccessToken(code);
//            case "naver" -> getNaverAccessToken(code);
            default -> throw new InvalidSocialTypeException();
        };
    }

    private String getKakaoAccessToken(String code){  // 카카오 API 호출을 위한 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoClientId);
        params.add("client_secret", kakaoClientSecret);
        params.add("redirect_uri", kakaoRedirectUri);  // 등록한 카카오 애플리케이션 설정에 등록한 리다이렉트 URI
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        // 카카오 API에 POST 요청을 보내 토큰 획득
        ResponseEntity<Map> response = restTemplate.postForEntity(kakaoTokenUri, request, Map.class);
        log.info("kakaoCallBack에서 responseEntity {}", response);

        // 응답에서 액세스 토큰 얻기
        String kakaoAccessToken = (String) response.getBody().get("access_token");
        log.info("kakaoCallBack에서 kakaoAccessToken {}", kakaoAccessToken);

        return kakaoAccessToken;
    }

    private OAuth2UserInfo getUserInfo(String provider, String accessToken){
        return switch (provider) {
            case "kakao" -> getKakaoUserInfo(accessToken);
//            case "naver" -> getNaverUserInfo(accessToken);
            default -> throw new InvalidSocialTypeException();
        };

    }

    private OAuth2UserInfo getKakaoUserInfo(String accessToken){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<?> httpEntity = new HttpEntity<>(headers);

        URI uri = UriComponentsBuilder.fromUriString(kakaoUserInfoUri)
                .build()
                .toUri();

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, String.class);
        Map<String, Object> userInfo;
        try {
            userInfo = new ObjectMapper().readValue(response.getBody(), Map.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        log.info("getKakaoUserInfo에서 userInfo {}", userInfo);
        KakaoUserInfo kakaoUserInfo = new KakaoUserInfo(userInfo);
        return kakaoUserInfo;
    }

    private void registerUser(OAuth2UserInfo userInfo){
        String provider = userInfo.getProvider();
        String providerId = userInfo.getProviderId();
        UUID uuid = UUID.nameUUIDFromBytes(providerId.getBytes());
        String id = uuid.toString();
        String username = userInfo.getName();
        String email = userInfo.getEmail();
        String profileUrl = userInfo.getProfileUrl();
        String gender = userInfo.getGender();
        int ageRange = userInfo.getAgeRange();
        String nickname = userInfo.getNickName();

        Optional<Auth> findAuth = authRepository.findById(id);
        User user = null;
        Auth auth = null;
        if (findAuth.isEmpty()) { //찾지 못했다면
            log.info("등록되지 않은 사용자입니다.");
            user = User.builder()
                    .id(id)
                    .nickname(nickname)
                    .gender(gender)
                    .ageRange(ageRange)
                    .profile_url(profileUrl)
                    .build();
            userRepository.save(user);
            auth = Auth.builder()
                    .id(id)
                    .email(email)
                    .name(username)
                    .provider(provider)
                    .providerId(providerId)
                    .authority(Authority.USER)
                    .build();
            authRepository.save(auth);
        }
        else{
            log.info("{}는 등록된 사용자입니다", findAuth.get().getName());
        }

    }
//    public void logout(HttpServletRequest request) {
//        String accessToken = jwtService.extractAccessToken(request).orElseThrow(InvalidTokenException::new);
//        Integer userId = jwtService.extractId(accessToken).orElseThrow(InvalidTokenException::new);
//        Auth auth = authRepository.findByUserId(userId).orElseThrow(AuthNotFoundException::new);
//        auth.setRefreshToken(null);
//        authRepository.save(auth);
//    }
}
