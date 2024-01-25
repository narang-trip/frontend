package com.ssafy.tripservice.db.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Document(collection = "trip")
public class Trip extends BaseEntity{
    private String tripName;
    private String tripDesc;
    private String tripRecruitDate;
    private String destination;
    private String tripAges;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private String tripChat;
    private String tripPlan;
    private List<Participant> participants;

    @Data
    public static class Participant {
        private String role;
        private String participantId;
        private LocalDateTime enrollmentDate;
    }
}
