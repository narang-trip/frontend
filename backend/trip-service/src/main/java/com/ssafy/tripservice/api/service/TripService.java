package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.response.TripResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TripService {
    /*
        Trip 생성
     */
    Optional<TripResponse> createTrip(TripRequest tripRequest);
    /*
        현재 기준 참가 가능한 Trip
     */
    List<TripResponse> getAvailableTrips(LocalDateTime currentTime);

    Optional<TripResponse> getTripById(UUID tripId);
}
