package com.ssafy.messageservice.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AlertAttendRequest {
    private String tripId;
    private String tripName;
    private String senderId;
    private String receiverId;
    private List<String> position;
    private String aspiration;
    private String alertType;
    private boolean isRead;
}
