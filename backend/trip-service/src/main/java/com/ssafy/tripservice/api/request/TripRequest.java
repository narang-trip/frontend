package com.ssafy.tripservice.api.request;

import com.ssafy.tripservice.db.entity.Trip;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@ToString
public class TripRequest {

    private UUID tripId;
    private String tripName;
    private String tripDesc;
    private String tripRecruitDate;
    private String destination;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private String tripChat;
    private UUID tripPlanId;
    private int tripAgeUpperBound;
    private int tripAgeLowerBound;
    private List<Trip.Participant> participants;

    public Trip toEntity() {
        return Trip.builder()
                .tripName(this.tripName)
                .tripDesc(this.tripDesc)
                .tripRecruitDate(this.tripRecruitDate)
                .destination(this.destination)
                .departureDate(this.departureDate)
                .returnDate(this.returnDate)
                .tripChat(this.tripChat)
                .tripPlanId(this.tripPlanId)
                .tripAgeUpperBound(this.tripAgeUpperBound)
                .tripAgeLowerBound(this.tripAgeLowerBound)
                .participants(this.participants)
                .build();
    }
}
