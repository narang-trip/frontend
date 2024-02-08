package com.ssafy.userservice.api.service;

import com.ssafy.userservice.api.oauth2.userinfo.KakaoUserInfo;
import com.ssafy.userservice.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2Service {
    private final ClientRegistrationRepository clientRegistrationRepository;
    private final JwtService jwtService;

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

    public String kakaoCallBack(String code){
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

        // 액세스 토큰을 사용하여 사용자 정보 요청
        ResponseEntity<KakaoUserInfo> userInfoResponseEntity = restTemplate.getForEntity(
                "https://kapi.kakao.com/v2/user/me", KakaoUserInfo.class,
                kakaoAccessToken);

        // 사용자 정보 얻기
        KakaoUserInfo userInfo = userInfoResponseEntity.getBody();
        log.info("kakaoCallBack에서 userInfo {}", userInfo);
        // 사용자 정보를 기반으로 JWT 토큰 생성
        String accessToken = jwtService.createAccessToken(userInfo.getEmail());

        log.info("kakaoCallBack에서 jwt accessToken {}", accessToken);


        String accessToken2 = kakaoAccessToken; // 일단 임시로

        return accessToken2;
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
