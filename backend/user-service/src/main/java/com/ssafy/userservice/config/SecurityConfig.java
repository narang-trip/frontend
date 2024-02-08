package com.ssafy.userservice.config;

import com.ssafy.userservice.api.oauth2.handler.LoginFailureHandler;
import com.ssafy.userservice.api.oauth2.handler.LoginSuccessHandler;
import com.ssafy.userservice.api.oauth2.handler.OAuth2LoginFailureHandler;
import com.ssafy.userservice.api.oauth2.handler.OAuth2LoginSuccessHandler;
import com.ssafy.userservice.api.service.LoginService;
import com.ssafy.userservice.api.service.PrincipalDetailsService;
import com.ssafy.userservice.api.service.UserService;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.db.repository.UserRepository;
//import com.ssafy.userservice.security.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.ssafy.userservice.security.filter.JwtAuthenticationProcessingFilter;
import com.ssafy.userservice.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private final LoginService loginService;
    private final ObjectMapper objectMapper;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final UserService customOAuth2UserService;
    private final JwtService jwtService;
    private final AuthRepository authRepository;

    @Bean
    public SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> securityConfigurerAdapter() {
        log.info("securityConfigurerAdapter() 호출");
        return new SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity>() {
            @Override
            public void configure(HttpSecurity http) throws Exception {
                http.cors().configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(List.of("*"));
                    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
                    corsConfiguration.setAllowedHeaders(List.of("*"));
                    corsConfiguration.setExposedHeaders(List.of("Authorization", "Authorization-refresh"));
                    corsConfiguration.setMaxAge(3600L);
                    return corsConfiguration;
                });
            }
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("SecurityFilterChain() 호출");
        http
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) ->
                        response.sendRedirect("https://i10a701.p.ssafy.io"))
                .and()
//                .cors(cors -> cors.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .headers(headers -> headers.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/api/user/**", "/oauth2/**", "/login/**", "/oauth/**",
                                "/v2/**", "/h2-console/**", "/sign-up").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2Login -> oauth2Login
                        .successHandler(oAuth2LoginSuccessHandler)
                        .failureHandler(oAuth2LoginFailureHandler)
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(customOAuth2UserService))
                );
//        http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
//        http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        log.info("passwordEncoder() 호출");
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        log.info("authenticationManager() 호출");
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(loginService);
        return new ProviderManager(provider);
    }

    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        log.info("loginSuccessHandler() 호출");
        return new LoginSuccessHandler(jwtService, authRepository);
    }

    @Bean
    public LoginFailureHandler loginFailureHandler() {
        log.info("loginFailureHandler() 호출");
        return new LoginFailureHandler();
    }

//    @Bean
//    public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
//        log.info("customJsonUsernamePasswordAuthenticationFilter() 호출");
//        CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordLoginFilter
//                = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
//        customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
//        customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
//        customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
//        return customJsonUsernamePasswordLoginFilter;
//    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        log.info("jwtAuthenticationProcessingFilter() 호출");
        return new JwtAuthenticationProcessingFilter(jwtService, authRepository);
    }

}