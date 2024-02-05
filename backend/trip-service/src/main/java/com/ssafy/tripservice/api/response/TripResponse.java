package com.ssafy.tripservice.api.response;

import com.ssafy.tripservice.db.entity.Trip;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
public class TripResponse {

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
}
