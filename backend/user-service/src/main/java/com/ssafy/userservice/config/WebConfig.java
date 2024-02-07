package com.ssafy.userservice.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("https://i10a701.p.ssafy.io")
                .allowedMethods("*");
//                .exposedHeaders("Authorization", "Authorization-refresh")
//                .maxAge(3600);
    }
}
