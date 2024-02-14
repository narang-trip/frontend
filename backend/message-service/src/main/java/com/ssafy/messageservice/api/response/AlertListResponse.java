package com.ssafy.messageservice.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlertListResponse {
    private List<AlertResponse> alertList;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AlertResponse{
        private String id;
        private String tripId;
        private String tripName;
        private String senderId;
        private String senderName;
        private String position;
        private String aspiration;
        private String alertType;
        private boolean isRead;
        private UUID usageId;
    }
}