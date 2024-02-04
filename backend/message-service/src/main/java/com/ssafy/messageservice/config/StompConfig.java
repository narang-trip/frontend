package com.ssafy.messageservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;

@Configuration
@EnableWebSocketMessageBroker
public class StompConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/message/chat")
                .setAllowedOriginPatterns("*").withSockJS();
        System.out.println("stomp 연결!!!!!!");
        //https://i10a701.p.ssafy.io"
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub");
        registry.enableSimpleBroker("/sub");
        System.out.println("stomp 연결????????");
//        registry.setPathMatcher(new AntPathMatcher("."));  // url을 chat/room/3 -> chat.room.3으로 참조하기 위한 설정
//        registry.setApplicationDestinationPrefixes("/pub");
//
//        //registry.enableSimpleBroker("/sub");
//        registry.enableStompBrokerRelay("/queue", "/topic", "/exchange", "/amq/queue")
//                .setRelayHost("rabbitmq")  // Docker 컨테이너명을 relay host로 사용
//                .setRelayPort(61613)
//                .setClientLogin("guest")  // RabbitMQ 및 STOMP 브로커에 사용되는 로그인 정보를 동일하게 설정
//                .setClientPasscode("guest");
    }

//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("https://i10a701.p.ssafy.io") // 프론트엔드 서버 주소
//                .allowedMethods("GET", "POST", "PUT", "DELETE")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }
}