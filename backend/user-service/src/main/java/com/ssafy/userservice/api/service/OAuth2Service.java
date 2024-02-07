package com.ssafy.userservice.api.service;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Value;

@Service
public class OAuth2Service {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoRedirectUri;

    private final ClientRegistrationRepository clientRegistrationRepository;

    public OAuth2Service(ClientRegistrationRepository clientRegistrationRepository) {
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    public String getAuthorizationUrl(String registrationId) {
        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(registrationId);

//        ClientRegistration clientRegistration = ClientRegistration
//                .withRegistrationId(registrationId)
//                .clientId(kakaoClientId)
//                .clientSecret(kakaoClientSecret)
//                .redirectUri(kakaoRedirectUri)
//                .authorizationGrantType("authorization_code")
//                .scope("profile", "email")
//                .build();

        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(clientRegistration.getProviderDetails().getAuthorizationUri())
                .queryParam("client_id", clientRegistration.getClientId())
                .queryParam("redirect_uri", clientRegistration.getRedirectUri())
                .queryParam("response_type", "code")
                .queryParam("scope", String.join(" ", clientRegistration.getScopes()));

        return builder.toUriString();
    }
}
