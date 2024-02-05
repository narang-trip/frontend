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
    private LocalDateTime recruitDate;
    private String destination;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private UUID tripChatId;
    private UUID tripPlanId;
    private Integer tripAgeUpperBound;
    private Integer tripAgeLowerBound;
    private List<Trip.Participant> participants;

    public Trip toEntity() {
        return Trip.builder()
                .tripName(this.tripName)
                .tripDesc(this.tripDesc)
                .recruitDate(this.recruitDate)
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
}
