package com.ssafy.tripservice.api.dto;

import com.ssafy.tripservice.db.entity.Trip;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
@RequiredArgsConstructor
public class TripDto {

    private String tripName;
    private String tripDesc;
    private String tripRecruitDate;
    private String destination;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private String tripChat;
    private UUID tripPlanId;
    private List<Integer> tripAges;
    private List<Trip.Participant> participants;
}
