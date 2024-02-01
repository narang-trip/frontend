package com.ssafy.messageservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class StompConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stomp/chat")
                .setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setPathMatcher(new AntPathMatcher("."));  // url을 chat/room/3 -> chat.room.3으로 참조하기 위한 설정
        registry.setApplicationDestinationPrefixes("/pub");

        //registry.enableSimpleBroker("/sub");
        registry.enableStompBrokerRelay("/queue", "/topic", "/exchange", "/amq/queue")
                .setRelayHost("rabbitmq")  // Docker 컨테이너명을 relay host로 사용
                .setRelayPort(61613)
                .setClientLogin("yoonjae")  // RabbitMQ 및 STOMP 브로커에 사용되는 로그인 정보를 동일하게 설정
                .setClientPasscode("dbswoWkd");
    }
}