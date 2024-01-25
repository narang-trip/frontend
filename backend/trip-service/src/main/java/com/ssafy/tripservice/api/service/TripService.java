package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.db.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TripService {
    private final TripRepository tripRepository;

    @Autowired
    public TripService(TripRepository tripRepository){
        this.tripRepository = tripRepository;
    }
}
