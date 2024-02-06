package com.ssafy.tripservice.api.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.request.UserRequest;
import com.ssafy.tripservice.api.response.TripResponse;
import com.ssafy.tripservice.api.service.TripService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Encoding;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
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

        List<TripResponse> availableTrips = tripService.getAvailableTrips();

        return new ResponseEntity<List<TripResponse>>(availableTrips, HttpStatus.OK);
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<TripResponse> getTripByTripId(@PathVariable UUID tripId) {

        Optional<TripResponse> trip =tripService.getTripById(tripId);

        // map : return Empty Optional it t is null
        return trip.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @io.swagger.v3.oas.annotations.parameters.RequestBody (content = @Content(encoding = @Encoding(name = "tripRequest", contentType = MediaType.APPLICATION_JSON_VALUE)))
    public ResponseEntity<?> postTrip(@RequestPart TripRequest tripRequest,
                                      @RequestPart(required = false) MultipartFile tripImg) {

        Optional<TripResponse> createRes = tripService.createTrip(tripRequest, tripImg);

        return createRes.map(r -> new ResponseEntity<>(r, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.internalServerError().build());
    }

    @PatchMapping("/join")
    public ResponseEntity<?> patchTripJoin(@RequestBody UserRequest userRequest) {


        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/leave")
    public ResponseEntity<?> patchTripLeave(@RequestBody UserRequest userRequest) {


        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /*
        Just For Test

     */
    @PostMapping(value = "/imgUploadTest", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
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
