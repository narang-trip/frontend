package com.ssafy.messageservice.api.handler;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class MyEventListener {

    @EventListener
    public void handleSessionConnectedEvent(SessionConnectedEvent event) {
        // 연결 성공 시 로직 추가
        System.out.println("stomp 연결되냐고!!!!!!!!!!!!!!!!!!!!!");
    }

    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent event) {
        // 연결 해제 시 로직 추가
    }
}
