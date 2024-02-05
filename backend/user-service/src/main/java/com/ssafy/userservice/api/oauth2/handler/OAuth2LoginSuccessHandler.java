package com.ssafy.userservice.api.oauth2.handler;

//import com.ssafy.userservice.api.oauth2.CustomOAuth2User;
import com.ssafy.userservice.db.entity.PrincipalDetails;
import com.ssafy.userservice.db.entity.Role;
import com.ssafy.userservice.security.jwt.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        PrincipalDetails oAuth2User = (PrincipalDetails) authentication.getPrincipal();
        if (oAuth2User.getAuth().getRole() == Role.USER) {
            String accessToken = jwtService.createAccessToken(oAuth2User.getAuth().getEmail());
            response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
            System.out.println("my =================> OAuth2LoginSuccessHandler -> onAuthenticationSuccess");
            response.sendRedirect("/api/user/loginForm"); // 가입 화면으로 보내기

            jwtService.sendAccessAndRefreshToken(response, accessToken, null);
        } else {
            loginSuccess(response, oAuth2User);
        }
    }

    private void loginSuccess(HttpServletResponse response, PrincipalDetails oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getAuth().getEmail());
        String refreshToken = jwtService.createRefreshToken();
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getAuth().getEmail(), refreshToken);
    }
}
