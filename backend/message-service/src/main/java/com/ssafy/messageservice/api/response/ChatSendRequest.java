package com.ssafy.messageservice.api.response;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatSendRequest {
    private String chatroomId;
    private String senderId;
    private String content;
}
