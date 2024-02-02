package com.ssafy.messageservice.api.handler;

import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;

public class CustomStompSessionHandler extends StompSessionHandlerAdapter {

    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        System.out.println("Connected to " + session.getSessionId());
        // 연결 후 처리 로직 추가
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        System.out.println("Received message: " + payload.toString());
        // 메시지 처리 로직 추가
    }
}
