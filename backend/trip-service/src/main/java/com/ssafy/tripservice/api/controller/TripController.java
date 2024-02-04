package com.ssafy.tripservice.api.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.response.TripResponse;
import com.ssafy.tripservice.api.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/trip")
@AllArgsConstructor
public class TripController {

    private final AmazonS3Client amazonS3Client;
    private final TripService tripService;

    @GetMapping("/available")
    public ResponseEntity<List<TripResponse>> getTripsAvailable() {

        List<TripResponse> availableTrips = tripService.getAvailableTrips(LocalDateTime.now());

        return new ResponseEntity<List<TripResponse>>(availableTrips, HttpStatus.OK);
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<TripResponse> getTripByTripId(@PathVariable UUID tripId) {

        Optional<TripResponse> trip =tripService.getTripById(tripId);

        // map : return Empty Optional it t is null
        return trip.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<?> postTrip(@RequestBody TripRequest tripRequest) {

        Optional<TripResponse> createRes = tripService.createTrip(tripRequest);

        return createRes.map(r -> new ResponseEntity<>(r, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.internalServerError().build());
    }

    @PostMapping(value = "/imgUploadTest", consumes = {"multipart/form-data"})
    public ResponseEntity<String> uploadFile(@RequestParam("img") MultipartFile img) {

        String bucket="youngkimi-bucket-01";

        try {
            String fileName = img.getOriginalFilename();
            String fileUrl = "https://" + bucket + "/test" + fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(img.getContentType());
            metadata.setContentLength(img.getSize());
            amazonS3Client.putObject(bucket, fileName, img.getInputStream(), metadata);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
