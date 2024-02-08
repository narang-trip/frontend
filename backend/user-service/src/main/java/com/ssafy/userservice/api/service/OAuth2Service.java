package com.ssafy.userservice.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.userservice.api.oauth2.userinfo.KakaoUserInfo;
import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.Authority;
import com.ssafy.userservice.db.entity.User;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.db.repository.UserRepository;
import com.ssafy.userservice.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
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
    private final ClientRegistrationRepository clientRegistrationRepository;
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


    public String kakaoCallBack(String code){
        /*
            받은 코드로 토큰 가져오기
         */
        // 카카오 API 호출을 위한 설정
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
        ResponseEntity<Map> responseEntity = restTemplate.postForEntity(
                "https://kauth.kakao.com/oauth/token", request, Map.class);

        log.info("kakaoCallBack에서 responseEntity {}", responseEntity);

        // 응답에서 액세스 토큰 얻기
        String kakaoAccessToken = (String) responseEntity.getBody().get("access_token");

        log.info("kakaoCallBack에서 kakaoAccessToken {}", kakaoAccessToken);

        /*
            받은 토큰으로 유저 정보 갖고오기
         */

        restTemplate = new RestTemplate();

        headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
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
        log.info("kakaoCallBack에서 userInfo {}", userInfo);
        KakaoUserInfo kakaoUserInfo = new KakaoUserInfo(userInfo);
        String accessToken = jwtService.createAccessToken(kakaoUserInfo.getEmail());
        log.info("kakaoCallBack에서 jwt accessToken {}", accessToken);
        // 액세스 토큰을 사용하여 사용자 정보 요청
//        ResponseEntity<Map> userInfoResponseEntity = restTemplate.getForEntity(
//                "https://kapi.kakao.com/v2/user/me", Map.class,
//                kakaoAccessToken);
//        log.info("kakaoCallBack에서 userInfoResponseEntity {}", userInfoResponseEntity);
//        // 사용자 정보 얻기
//        Map userInfo = userInfoResponseEntity.getBody();
//        log.info("kakaoCallBack에서 userInfo {}", userInfo);
//      // 사용자 정보를 기반으로 JWT 토큰 생성
//        String accessToken = jwtService.createAccessToken(userInfo.getEmail());

//        log.info("kakaoCallBack에서 jwt accessToken {}", accessToken);


//        String accessToken2 = kakaoAccessToken; // 일단 임시로

        /*
            DB에 저장하기
         */
        String provider = kakaoUserInfo.getProvider();
        String providerId = kakaoUserInfo.getProviderId();
        UUID uuid = UUID.nameUUIDFromBytes(provider.getBytes());
        String id = uuid.toString();
        String username = kakaoUserInfo.getName();
        String email = kakaoUserInfo.getEmail();
        String profileUrl = kakaoUserInfo.getProfileUrl();
        String gender = kakaoUserInfo.getGender();
        int ageRange = kakaoUserInfo.getAgeRange();
        String nickname = kakaoUserInfo.getNickName();

        Optional<Auth> findAuth = authRepository.findById(id);
        User user = null;
        Auth auth = null;
        if (findAuth.isEmpty()) { //찾지 못했다면
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
            auth =findAuth.get();
        }
        return accessToken;
    }

    public String getAuthorizationUrl(String registrationId) {
//        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(registrationId);
        log.info("getAuthorizationUrl 함수 호출============");
        ClientRegistration clientRegistration = ClientRegistration
                .withRegistrationId(registrationId)
                .clientId(kakaoClientId)
                .clientSecret(kakaoClientSecret)
                .redirectUri(kakaoRedirectUri)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .scope("profile", "email")
                .authorizationUri(kakaoAuthorizationUri)
                .tokenUri(kakaoTokenUri)
                .build();
        log.info(clientRegistration.toString());
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(clientRegistration.getProviderDetails().getAuthorizationUri())
                .queryParam("client_id", clientRegistration.getClientId())
                .queryParam("redirect_uri", clientRegistration.getRedirectUri())
                .queryParam("response_type", "code")
                .queryParam("scope", String.join(" ", clientRegistration.getScopes()));
        log.info(builder.toString());
        log.info(builder.toUriString());
        return builder.toUriString();
    }
}
