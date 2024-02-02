package com.ssafy.tripservice.db.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Document(collection = "narang-trip")
public class Trip extends BaseEntity{
    private String tripName;
    private String tripDesc;
    private String tripRecruitDate;
    private String destination;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private String tripChat;
    private UUID tripPlanId;
    private List<Integer> tripAges;
    private List<Participant> participants;
    // plan_id : json, java.
    // trip_Age : json

    @Data
    public static class Participant {
        private String role;
        private String participantId;
        private LocalDateTime enrollmentDate;
    }
}
