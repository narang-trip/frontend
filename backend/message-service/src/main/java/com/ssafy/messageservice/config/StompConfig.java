package com.ssafy.messageservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
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
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Configuration
@EnableWebSocketMessageBroker
//@RequiredArgsConstructor
public class StompConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/message/chat")
                .setAllowedOriginPatterns("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub");
        registry.enableSimpleBroker("/sub");
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
//        registry.addMapping("/api/message/chat")
//                .allowedOrigins("https://i10a701.p.ssafy.io") // 프론트엔드 서버 주소
//                .allowedMethods("GET", "POST", "PUT", "DELETE")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }

//    @Override
//    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
//        registration.setMessageSizeLimit(50 * 1024 * 1024); // 메세지 크기 제한 오류 방지(이 코드가 없으면 byte code를 보낼때 소켓 연결이 끊길 수 있음)
//    }
//    @EventListener
//    public void connectEvent(SessionConnectEvent sessionConnectEvent){
//        System.out.println(sessionConnectEvent);
//        System.out.println("연결 성공 감지!_!");
//    }
//    @EventListener
//    public void onDisconnectEvent(SessionDisconnectEvent sessionDisconnectEvent) {
//        System.out.println(sessionDisconnectEvent.getSessionId());
//        System.out.println("연결 끊어짐 감지!!!!!!!!!");
//    }
}