package com.ssafy.messageservice.api.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * 채팅 생성 API 데이터
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatRequest {
    private String chatroomId;
    private String senderId;
    private LocalDateTime sendTime;
    private String content;
}
