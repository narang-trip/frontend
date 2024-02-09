package com.ssafy.userservice.api.oauth2.handler;

import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.security.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final AuthRepository authRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        String id = extractUsername(authentication);
        String accessToken = jwtService.createAccessToken(id);
        String refreshToken = jwtService.createRefreshToken();

        addCorsHeaders(response); // CORS 헤더 추가

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);

        authRepository.findById(id)
                .ifPresent(auth ->{
                    auth.updateRefreshToken(refreshToken);
                    authRepository.saveAndFlush(auth);
                });

        log.info("로그인에 성공하였습니다. ID : {}", id);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
    }

    private void addCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Expose-Headers", "Authorization, Authorization-refresh");
    }
    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}

