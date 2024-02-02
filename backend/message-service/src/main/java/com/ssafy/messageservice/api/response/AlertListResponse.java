package com.ssafy.messageservice.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class AlertListResponse {
    private List<AlertResponse> alertList;

    @Getter
    @AllArgsConstructor
    public static class AlertResponse{
        private String alertId;
        private String tripId;
        private String tripName;
        private String senderId;
        private String senderName;
        private List<String> position;
        private String aspiration;
        private String alertType;
        private boolean isRead;
    }
}