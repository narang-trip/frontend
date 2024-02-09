package com.ssafy.userservice.api.oauth2.handler;

//import com.ssafy.userservice.api.oauth2.CustomOAuth2User;
import com.ssafy.userservice.db.entity.PrincipalDetails;
import com.ssafy.userservice.db.entity.Authority;
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
        if (oAuth2User.getAuth().getAuthority() == Authority.USER) {
            String accessToken = jwtService.createAccessToken(oAuth2User.getAuth().getId());
            response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
            log.info("my =================> OAuth2LoginSuccessHandler -> onAuthenticationSuccess");
            response.sendRedirect("https://i10a701.p.ssafy.io"); // 가입 화면으로 보내기

            // AccessToken만 추가
            jwtService.sendAccessToken(response, accessToken);
        } else {
            loginSuccess(response, oAuth2User);
        }
    }

    private void loginSuccess(HttpServletResponse response, PrincipalDetails oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getAuth().getId());
        String refreshToken = jwtService.createRefreshToken();
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

        // AccessToken과 RefreshToken 추가
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getAuth().getId(), refreshToken);
    }
}
