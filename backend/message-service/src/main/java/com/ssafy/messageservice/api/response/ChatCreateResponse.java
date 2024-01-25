package com.ssafy.messageservice.api.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 채팅방 리스트 API 데이터
 */
@Getter
@Setter
public class ChatCreateResponse {
    private String chatroomId;
    private String chatroomName;
    private String latestContent;
    private LocalDateTime latestTime;
    private String senderId;
    private String senderName;
    private String senderImgUrl;
}