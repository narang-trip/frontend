package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.response.TripResponse;
import com.ssafy.tripservice.db.entity.Trip;
import com.ssafy.tripservice.db.repository.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;

    @Override
    public Optional<TripResponse> createTrip(TripRequest tripRequest) {

        Trip trip = tripRequest.toEntity();

        try {
            tripRepository.save(trip);
            return Optional.of(trip.toTripResponse());
        } catch (DataAccessException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public List<TripResponse> getAvailableTrips(LocalDateTime currentTime) {
        return tripRepository.findAll()
                .stream().map(Trip::toTripResponse)
                .toList();
    }

    @Override
    public Optional<TripResponse> getTripById(UUID tripId) {

        return tripRepository.findById(tripId)
                .map(Trip::toTripResponse);
    }
}
