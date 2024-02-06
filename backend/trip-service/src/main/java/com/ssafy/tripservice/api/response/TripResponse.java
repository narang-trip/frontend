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
    private String tripImgUrl;
    private LocalDateTime recruitDate;
    private String destination;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private UUID tripLeaderId;
    private UUID tripChatId;
    private UUID tripPlanId;
    private Integer viewCnt;
    private Integer tripParticipantsSize;
    private Integer tripDeposit;
    private Integer tripAgeUpperBound;
    private Integer tripAgeLowerBound;
    private List<String> tripConcepts;
    private List<String> tripRoles;
    private List<Trip.Participant> participants;
}
