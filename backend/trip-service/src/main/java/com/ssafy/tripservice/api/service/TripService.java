package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.api.request.TripQueryRequest;
import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.request.UserRequest;
import com.ssafy.tripservice.api.response.TripPageResponse;
import com.ssafy.tripservice.api.response.TripResponse;
import com.ssafy.tripservice.db.entity.Trip;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
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
            Trip 생성
    */
    Optional<TripResponse> modifyTrip(TripRequest tripRequest, MultipartFile tripImg);
    /*
        현재 기준 참가 가능한 Trip
     */
    List<TripResponse> getAvailableTrips();
    Optional<TripResponse> getTripById(UUID tripId);
    Optional<TripResponse> joinTrip(UserRequest userRequest);
    boolean leaveTrip(UserRequest userRequest);
    boolean deleteTrip(UserRequest userRequest);
    public Page<TripPageResponse> getAvailableTripPages(int pageNo);
    public List<TripResponse> getBannerTrips(String tripConcept);
    public Page<TripPageResponse> getTripsIveBeen(TripQueryRequest tripQueryRequest);
    public Page<TripPageResponse> getTripsIveOwn(TripQueryRequest tripQueryRequest);
    public long eraseWithdrawalUser(UUID userId);
}