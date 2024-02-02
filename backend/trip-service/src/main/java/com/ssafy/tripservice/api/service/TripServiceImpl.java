package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.db.entity.Trip;
import com.ssafy.tripservice.db.repository.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TripServiceImpl implements TripService {


    private final TripRepository tripRepository;

    @Override
    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    @Override
    public List<Trip> getAvailableTrips() {
        return tripRepository.findAll();
    }
}
