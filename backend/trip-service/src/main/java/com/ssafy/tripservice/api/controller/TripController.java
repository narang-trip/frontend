package com.ssafy.tripservice.api.controller;

import com.ssafy.tripservice.api.dto.TripDto;
import com.ssafy.tripservice.api.service.TripService;
import com.ssafy.tripservice.db.entity.Trip;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/trip")
@AllArgsConstructor
public class TripController {

    private final TripService tripService;

    @GetMapping("/trip/available")
    public ResponseEntity<List<TripDto>> getTripsAvailable() {

        List<TripDto> availableTrips = tripService.getAvailableTrips(LocalDateTime.now());

        return new ResponseEntity<List<TripDto>>(availableTrips, HttpStatus.OK);
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<TripDto> getTripByTripId(@PathVariable UUID tripId) {

        Optional<TripDto> trip =tripService.getTripById(tripId);

        // map : return Empty Optional it t is null
        return trip.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/trip/create")
    public ResponseEntity<?> postTrip(TripDto tripDto) {

        Optional<TripDto> createRes = tripService.createTrip(tripDto);

        return createRes.map(r -> new ResponseEntity<>(r, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

//    @GetMapping("/publishAsync")
//    public void publish(String topic, String message) {
//        // Topic + Message
//        CompletableFuture<?> futureResult = tripEventProducer.request(topic, message);
//
//        futureResult.whenComplete((result, exception) -> {
//            if (exception != null) {
//                exception.printStackTrace();
//            }
//            else {
//                System.out.println("DONE WELL");
//                System.out.println(futureResult);
//            }
//        });
//    }
}
