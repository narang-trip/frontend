package com.ssafy.userservice.security.filter;

import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.security.jwt.JwtService;
import com.ssafy.userservice.security.util.PasswordUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL = "/login"; // "/login"으로 들어오는 요청은 Filter 작동 X

    private final JwtService jwtService;
//    private final UserRepository userRepository;
    private final AuthRepository authRepository;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().equals(NO_CHECK_URL)) {
            filterChain.doFilter(request, response);
            return;
        }
        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElse(null);
        if (refreshToken != null) {
            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
            return;
        }
        checkAccessTokenAndAuthentication(request, response, filterChain);
    }

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
        authRepository.findByRefreshToken(refreshToken)
                .ifPresent(auth -> {
                    String reIssuedRefreshToken = reIssueRefreshToken(auth);
                    addCorsHeaders(response); // CORS 헤더 추가
                    jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(auth.getEmail()),
                            reIssuedRefreshToken);
                });
    }

    private void addCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Expose-Headers", "Authorization, Authorization-refresh");
    }

    private String reIssueRefreshToken(Auth auth) {
        String reIssuedRefreshToken = jwtService.createRefreshToken();
        auth.updateRefreshToken(reIssuedRefreshToken);
        authRepository.saveAndFlush(auth);
        return reIssuedRefreshToken;
    }

    public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response,
                                                  FilterChain filterChain) throws ServletException, IOException {
        log.info("checkAccessTokenAndAuthentication() 호출");

        // 1. AccessToken 추출
        Optional<String> accessToken = jwtService.extractAccessToken(request);
        if (!accessToken.isPresent()) {
            log.error("AccessToken이 없거나 비정상적인 형식입니다.");
            filterChain.doFilter(request, response);
            return;
        }

        // 2. AccessToken 유효성 검사
        if (!jwtService.isTokenValid(accessToken.get())) {
            log.error("유효하지 않은 AccessToken입니다.");
            filterChain.doFilter(request, response);
            return;
        }

        // 3. AccessToken에서 이메일 추출
        Optional<String> userEmail = jwtService.extractEmail(accessToken.get());
        if (!userEmail.isPresent()) {
            log.error("AccessToken에서 이메일을 추출할 수 없습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        // 4. 추출한 이메일을 사용하여 사용자 정보 조회
        authRepository.findByEmail(userEmail.get())
                .ifPresent(this::saveAuthentication);

//        jwtService.extractAccessToken(request)
//                .filter(jwtService::isTokenValid)
//                .flatMap(jwtService::extractEmail)
//                .flatMap(authRepository::findByEmail)
//                .ifPresent(this::saveAuthentication);

        filterChain.doFilter(request, response);
    }

    public void saveAuthentication(Auth myUser) {
        String password = myUser.getPassword();
        if (password == null) {
            password = PasswordUtil.generateRandomPassword();
        }


        UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
                .username(myUser.getEmail())
                .password(password)
                .roles(String.valueOf(myUser.getRole()))
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
