package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.db.entity.Trip;

import java.util.List;

public interface TripService {
    /*
        Trip 생성
     */
    Trip createTrip(Trip trip);
    /*
        현재 기준 참가 가능한 Trip
     */
    List<Trip> getAvailableTrips();
}
