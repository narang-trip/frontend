package com.ssafy.messageservice.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AlertAttendRequest {
    private String senderId;
    private String receiverId;
    private String position;
    private String aspiration;
    private String status;
    private boolean isRead;
}
