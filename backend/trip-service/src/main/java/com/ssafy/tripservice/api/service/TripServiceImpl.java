package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.api.dto.TripDto;
import com.ssafy.tripservice.db.entity.Trip;
import com.ssafy.tripservice.db.repository.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TripServiceImpl implements TripService {


    private final TripRepository tripRepository;

    @Override
    public Optional<TripDto> createTrip(TripDto tripDto) {

        return Optional.of(tripRepository.save(tripDto));
    }

    @Override
    public List<TripDto> getAvailableTrips(LocalDateTime currentTime) {
        return tripRepository.findAll();
    }

    @Override
    public Optional<TripDto> getTripById(UUID tripId) {
        return tripRepository.findById(tripId);
    }

}
