package com.ssafy.tripservice.db.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.response.TripResponse;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@EqualsAndHashCode(callSuper = true)
@Document(collection = "narang-trip")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Trip extends BaseEntity{
    private String tripName;
    private String tripDesc;
    private LocalDateTime tripRecruitDate;
    private String destination;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private UUID tripChatId;
    private UUID tripPlanId;
    private int tripAgeUpperBound;
    private int tripAgeLowerBound;
    private List<Participant> participants;

    public TripResponse toTripResponse() {
        return TripResponse.builder()
                .tripId(this.get_id())
                .tripName(this.tripName)
                .tripDesc(this.tripDesc)
                .tripRecruitDate(this.tripRecruitDate)
                .destination(this.destination)
                .departureDate(this.departureDate)
                .returnDate(this.returnDate)
                .tripChatId(this.tripChatId)
                .tripPlanId(this.tripPlanId)
                .tripAgeUpperBound(this.tripAgeUpperBound)
                .tripAgeLowerBound(this.tripAgeLowerBound)
                .participants(this.participants)
                .build();
    }
    // plan_id : json, java.
    // trip_Age : json

    @Data
    public static class Participant {
        private String role;
        private UUID participantId;
        private LocalDateTime enrollmentDate;
    }
}
