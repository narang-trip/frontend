package com.ssafy.userservice.config;

import com.ssafy.userservice.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;




import com.example.logincomplete.domain.auth.login.handler.LoginFailureHandler;
import com.example.logincomplete.domain.auth.login.handler.LoginSuccessHandler;
import com.example.logincomplete.domain.auth.login.service.LoginService;
import com.example.logincomplete.domain.auth.oauth2.handler.OAuth2LoginFailureHandler;
import com.example.logincomplete.domain.auth.oauth2.handler.OAuth2LoginSuccessHandler;
import com.example.logincomplete.domain.auth.oauth2.service.CustomOAuth2UserService;
import com.example.logincomplete.domain.auth.repository.AuthRepository;
import com.example.logincomplete.domain.security.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.example.logincomplete.domain.security.filter.JwtAuthenticationProcessingFilter;
import com.example.logincomplete.domain.security.jwt.JwtService;
import com.example.logincomplete.domain.user.repository.UserRepository;
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

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
//        return httpSecurity
//                .httpBasic().disable()
//                .csrf().disable()
//                .cors().and()
//                .authorizeRequests()
//                .requestMatchers("/private/**").authenticated() //private로 시작하는 uri는 로그인 필수
//                .requestMatchers("/admin/**").access("hasRole('ROLE_ADMIN')") //admin으로 시작하는 uri는 관릴자 계정만 접근 가능
//                .anyRequest().permitAll() //나머지 uri는 모든 접근 허용
////                .anyRequest().authenticated()
//                .and()
//                .formLogin() // form login 관련 설정
//                .loginPage("/loginForm")
//                .usernameParameter("name") // Member가 username이라는 파라미터 갖고 있으면 안 적어도 됨.
//                .loginProcessingUrl("/login") // 로그인 요청 받는 url
//                .defaultSuccessUrl("/home") // 로그인 성공 후 이동할 url
//                .and().oauth2Login()//oauth2 관련 설정
//                .loginPage("/loginForm") //로그인이 필요한데 로그인을 하지 않았다면 이동할 uri 설정
//                .defaultSuccessUrl("/welcome") //OAuth 로그인이 성공하면 이동할 uri 설정
//                .userInfoEndpoint()//로그인 완료 후 회원 정보 받기
//                .userService(userService).and().and().build(); //
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(AbstractHttpConfigurer::disable) // 개발 단계에서만 사용하기!
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/oauth2/**", "/login/**", "/h2-console/**", "/sign-up").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2Login -> oauth2Login
//                        .successHandler(oAuth2LoginSuccessHandler)
//                        .failureHandler(oAuth2LoginFailureHandler)
                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                                .userService(userService)
                        ));
        return httpSecurity.build();

    }
}