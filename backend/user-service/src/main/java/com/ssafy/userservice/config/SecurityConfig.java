package com.ssafy.userservice.config;

import com.ssafy.userservice.api.oauth2.handler.OAuth2LoginFailureHandler;
import com.ssafy.userservice.api.oauth2.handler.OAuth2LoginSuccessHandler;
import com.ssafy.userservice.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;




import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private final UserService userService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
//        return httpSecurity
//                .httpBasic().disable()
//                .csrf().disable()
//                .cors().and()
//                .authorizeRequests()
////                .requestMatchers("/private/**").authenticated() //private로 시작하는 uri는 로그인 필수
////                .requestMatchers("/admin/**").access("hasRole('ROLE_ADMIN')") //admin으로 시작하는 uri는 관릴자 계정만 접근 가능
//                .anyRequest().permitAll() //나머지 uri는 모든 접근 허용
////                .anyRequest().authenticated()
//                .and()
//                .formLogin() // form login 관련 설정
//                .loginPage("/api/user/loginForm")
////                .usernameParameter("name") // Member가 username이라는 파라미터 갖고 있으면 안 적어도 됨.
//                .loginProcessingUrl("/api/user/loginForm3") // 로그인 요청 받는 url
////                .defaultSuccessUrl("/loginForm") // 로그인 성공 후 이동할 url
//                .and().oauth2Login()//oauth2 관련 설정
//                .loginPage("/api/user/loginForm4") //로그인이 필요한데 로그인을 하지 않았다면 이동할 uri 설정
//                .defaultSuccessUrl("/api/user/loginForm2") //OAuth 로그인이 성공하면 이동할 uri 설정
//                .userInfoEndpoint()//로그인 완료 후 회원 정보 받기
//                .userService(userService).and().and().build(); //
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(AbstractHttpConfigurer::disable) // 개발 단계에서만 사용하기!
                .authorizeHttpRequests((auth) -> auth
                        .anyRequest().permitAll() //나머지 uri는 모든 접근 허용
//                                .requestMatchers("/", "/api/user/*", "/api/user/oauth2/**", "/login/**").permitAll()
//                                .anyRequest().authenticated()
                )
                .oauth2Login(oauth2Login -> oauth2Login
                        .defaultSuccessUrl("/api/user/loginForm") //OAuth 로그인이 성공하면 이동할 uri 설정
                        .successHandler(oAuth2LoginSuccessHandler)
                        .failureHandler(oAuth2LoginFailureHandler)
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(userService)
                        )
                )
                .formLogin(formLogin -> formLogin
                        .loginPage("/api/user/loginForm")
                        .permitAll()
                );
        return httpSecurity.build();

    }
}