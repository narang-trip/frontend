package com.ssafy.userservice.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.userservice.api.oauth2.exception.InvalidSocialTypeException;
import com.ssafy.userservice.api.oauth2.exception.AuthNotFoundException;
import com.ssafy.userservice.api.oauth2.exception.UserNotFoundException;
import com.ssafy.userservice.db.entity.Auth;
//import com.ssafy.togeball.domain.auth.exception.InvalidTokenException;
import com.ssafy.userservice.db.entity.SocialType;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.security.jwt.JwtService;
import com.ssafy.userservice.db.entity.User;
//import com.ssafy.togeball.domain.user.oauth2.OAuthAttributes;
import com.ssafy.userservice.db.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;
import java.util.Optional;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String naverClientId;

    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String naverClientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;

    @Value("${spring.security.oauth2.client.registration.naver.redirect-uri}")
    private String naverRedirectUri;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoRedirectUri;

    @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
    private String naverTokenUri;

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String kakaoTokenUri;

    @Value("${spring.security.oauth2.client.provider.naver.user-info-uri}")
    private String naverUserInfoUri;

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String kakaoUserInfoUri;

    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public String oauth2Login(String provider, String authorizationCode, HttpServletResponse response) {
        String accessToken = switch (provider) {
//            case "google" -> getAccessTokenForGoogle(authorizationCode);
            case "kakao" -> getAccessTokenForKakao(authorizationCode);
            default -> throw new InvalidSocialTypeException();
        };

        Auth auth = getUserInfo(provider, accessToken);
        log.info("userInfo : {}", auth.getEmail());
        setTokensForUser(auth.getId(), response);
        return auth.getId();
    }

    public Auth getUserInfo(String provider, String accessToken) {
        return switch (provider) {
            case "naver" -> getUserInfoForNaver(accessToken);
            case "kakao" -> getUserInfoForKakao(accessToken);
            default -> throw new InvalidSocialTypeException();
        };
    }

    public Auth getUserInfoForNaver(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + accessToken);
        HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);

        URI uri = UriComponentsBuilder.fromUriString(naverUserInfoUri)
                .build()
                .toUri();

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, String.class);
        Map<String, Object> userInfo;
        try {
            userInfo = new ObjectMapper().readValue(response.getBody(), Map.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        OAuthAttributes extractAttributes = OAuthAttributes.of(SocialType.NAVER, "email", userInfo);
        return getAuth(extractAttributes, SocialType.NAVER);
    }

    public Auth getUserInfoForKakao(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + accessToken);
        HttpEntity<?> httpEntity = new HttpEntity<>(httpHeaders);

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

        OAuthAttributes extractAttributes = OAuthAttributes.of(SocialType.KAKAO, "email", userInfo);
        return getAuth(extractAttributes, SocialType.KAKAO);
    }

    private String getAccessTokenForGoogle(String authorizationCode) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", authorizationCode);
        params.add("client_id", naverClientId);
        params.add("client_secret", naverClientSecret);
        params.add("redirect_uri", naverRedirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> res = restTemplate.postForEntity(naverTokenUri, request, Map.class);

        if (res.getBody() == null) {
            throw new InvalidTokenException();
        }
        return (String) res.getBody().get("access_token");
    }

    private String getAccessTokenForKakao(String authorizationCode) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", authorizationCode);
        params.add("client_id", kakaoClientId);
        params.add("client_secret", kakaoClientSecret);
        params.add("redirect_uri", kakaoRedirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> res = restTemplate.postForEntity(kakaoTokenUri, request, Map.class);

        if (res.getBody() == null) {
            throw new InvalidTokenException();
        }
        return (String) res.getBody().get("access_token");
    }


    public void createAuth(Integer userId, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        Auth auth = Auth.builder()
                .userId(user.getId())
                .password(password)
                .build();

        authRepository.save(auth);
    }

    public Optional<Auth> findAuthById(Integer id) {
        return authRepository.findById(id);
    }

    public Optional<Auth> findByUserId(Integer userId) {
        return authRepository.findByUserId(userId);
    }

    public void updateRefreshToken(Integer id, String refreshToken) {
        authRepository.findByUserId(id)
                .ifPresent(auth -> {
                    auth.setRefreshToken(refreshToken);
                    authRepository.saveAndFlush(auth);
                });
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findById(Integer.parseInt(username))
                .orElseThrow(UserNotFoundException::new);

        Auth auth = authRepository.findById(user.getId())
                .orElseThrow(AuthNotFoundException::new);

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getId().toString())
                .password(auth.getPassword())
                .roles(user.getRole().name())
                .build();
    }

    public void reissueAccessToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtService.extractRefreshToken(request).orElseThrow(InvalidTokenException::new);

        if (jwtService.isTokenValid(refreshToken)) {
            authRepository.findByRefreshToken(refreshToken).ifPresent(auth -> {
                String newAccessToken = jwtService.createAccessToken(auth.getId());
                jwtService.sendAccessToken(response, newAccessToken);
            });
        } else {
            throw new InvalidTokenException();
        }
    }

    public void setTokensForUser(String userId, HttpServletResponse response) {
        Auth auth = authRepository.findById(userId).orElseThrow(AuthNotFoundException::new);
        Integer id = auth.getUserId();

        String accessToken = jwtService.createAccessToken(id);
        String refreshToken = jwtService.createRefreshToken();

        jwtService.sendAccessToken(response, accessToken);
        jwtService.sendRefreshToken(response, refreshToken);

        updateRefreshToken(id, refreshToken);
    }

    public void logout(HttpServletRequest request) {
        String accessToken = jwtService.extractAccessToken(request).orElseThrow(InvalidTokenException::new);
        Integer userId = jwtService.extractId(accessToken).orElseThrow(InvalidTokenException::new);
        Auth auth = authRepository.findByUserId(userId).orElseThrow(AuthNotFoundException::new);
        auth.setRefreshToken(null);
        authRepository.save(auth);
    }

    private Auth getAuth(OAuthAttributes attributes, SocialType socialType) {
        Auth find = authRepository.findBySocialTypeAndSocialId(socialType,
                attributes.getOAuth2UserInfo().getId()).orElse(null);

        if (find == null) {
            User user = saveUser(attributes);
            find = saveAuth(attributes, socialType, user.getId());
        }

        return authRepository.findById(find.getId()).orElseThrow(UserNotFoundException::new);
    }

    private User saveUser(OAuthAttributes attributes) {
        log.info("처음 오시는 고객님!");
        User createdUser = attributes.toUserEntity(attributes.getOAuth2UserInfo());
        return userRepository.save(createdUser);
    }

    private Auth saveAuth(OAuthAttributes attributes, SocialType socialType, String userId) {
        Auth createdAuth = attributes.toAuthEntity(socialType, userId, attributes.getOAuth2UserInfo());
        return authRepository.save(createdAuth);
    }
}