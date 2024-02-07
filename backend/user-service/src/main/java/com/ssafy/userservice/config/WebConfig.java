package com.ssafy.userservice.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/user/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
//                .allowCredentials(true)
                .exposedHeaders("Authorization", "Authorization-refresh");
//                .maxAge(3600);
        // OAuth2 인증 엔드포인트에 대한 매핑 추가
        registry.addMapping("/oauth/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
//                .allowCredentials(true)
                .exposedHeaders("Authorization", "Authorization-refresh");
        // 추가: Kakao 계정 로그인에 대한 CORS 설정
        registry.addMapping("/api/user/oauth2/authorization/kakao")
                .allowedOrigins("https://i10a701.p.ssafy.io") // 실제 도메인으로 변경
                .allowedMethods("GET", "POST")
//                .allowCredentials(true)
                .exposedHeaders("Authorization", "Authorization-refresh");
    }
}
