package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.api.dto.TripDto;
import com.ssafy.tripservice.db.entity.Trip;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TripService {
    /*
        Trip 생성
     */
    Optional<TripDto> createTrip(TripDto tripDto);
    /*
        현재 기준 참가 가능한 Trip
     */
    List<TripDto> getAvailableTrips(LocalDateTime currentTime);

    Optional<TripDto> getTripById(UUID tripId);
}
