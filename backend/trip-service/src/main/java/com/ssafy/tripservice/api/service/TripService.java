package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.request.UserRequest;
import com.ssafy.tripservice.api.response.TripResponse;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface TripService {
    /*
        Trip 생성
     */
    Optional<TripResponse> createTrip(TripRequest tripRequest, MultipartFile tripImg);
    /*
        현재 기준 참가 가능한 Trip
     */
    List<TripResponse> getAvailableTrips();

    Optional<TripResponse> getTripById(UUID tripId);

    Optional<Integer> getTripParticipantsSize(UUID tripId);

    Optional<TripResponse> joinTrip(UserRequest userRequest);

    Optional<TripResponse> leaveTrip(UserRequest userRequest);
}
