package com.ssafy.tripservice.api.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.request.UserRequest;
import com.ssafy.tripservice.api.response.TripPageResponse;
import com.ssafy.tripservice.api.response.TripResponse;
import com.ssafy.tripservice.api.service.TripService;
import com.ssafy.tripservice.db.entity.Trip;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Encoding;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
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

    @GetMapping("/trips/available")
    public ResponseEntity<List<TripResponse>> getTripsAvailable() {

        List<TripResponse> availableTrips = tripService.getAvailableTrips();

        return new ResponseEntity<List<TripResponse>>(availableTrips, HttpStatus.OK);
    }

    @Operation(summary = "Trip ID 로 TRIP 개별 조회",
            responses = {
                    @ApiResponse(description = "The Trip",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Trip.class))),
                    @ApiResponse(responseCode = "404", description = "Trip not found")})
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<TripResponse> getTripByTripId(@Parameter(description = "trip Id needs to be fetched") @PathVariable UUID tripId) {

        Optional<TripResponse> trip =tripService.getTripById(tripId);

        // map : return Empty Optional it t is null
        return trip.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Trip 생성",
            responses = {
                    @ApiResponse(description = "The Trip Created",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Trip.class))),
                    @ApiResponse(responseCode = "400", description = "Trip Not Created")})
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @io.swagger.v3.oas.annotations.parameters.RequestBody (content = @Content(encoding = @Encoding(name = "tripRequest", contentType = MediaType.APPLICATION_JSON_VALUE)))
    public ResponseEntity<?> postTrip(@RequestPart TripRequest tripRequest,
                                      @RequestPart(required = false) MultipartFile tripImg) {

        Optional<TripResponse> createRes = tripService.createTrip(tripRequest, tripImg);

        return createRes.map(r -> new ResponseEntity<>(r, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Trip 가입",
            responses = {
                    @ApiResponse(description = "The Trip You Joined",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Trip.class))),
                    @ApiResponse(responseCode = "400", description = "User Not Joined")})
    @PatchMapping("/trip/join")
    public ResponseEntity<?> patchTripJoin(@RequestBody UserRequest userRequest) {
        ;
        Optional<TripResponse> joinRes = tripService.joinTrip(userRequest);

        return joinRes.map(j -> new ResponseEntity<>(j, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Trip 탈퇴",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User Canceled Successfully"),
                    @ApiResponse(responseCode = "400", description = "User Not Canceled")})
    @PatchMapping("/trip/leave")
    public ResponseEntity<Void> patchTripLeave(@RequestBody UserRequest userRequest) {

        if (tripService.leaveTrip(userRequest))
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
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

    @Operation(summary = "Trip 삭제",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User Deleted Trip Successfully"),
                    @ApiResponse(responseCode = "404", description = "Trip Deletion Failed")})
    @DeleteMapping("/trip/{tripId}")
    public ResponseEntity<Void> deleteTrip(@RequestBody UserRequest userRequest) {
        return tripService.deleteTrip(userRequest) ?
                ResponseEntity.ok().build() : ResponseEntity. badRequest().build();
    }

    @Operation(summary = "참여 가능한 Trip Pages 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Trips You Can Join")})
    @GetMapping("/page/{pageNo}")
    public ResponseEntity<Page<TripPageResponse>> getAvailableTripsPageable(@PathVariable("pageNo") int pageNo) {
        return new ResponseEntity<>(tripService.getAvailableTripPages(pageNo), HttpStatus.OK);
    }


    @Operation(summary = "배너용 Trips",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Trips For Banner")})
    @ResponseBody
    @GetMapping("/trips/banner")
    public ResponseEntity<List<TripResponse>> getBannerTrips(
            @RequestParam("tripConcept") String tripConcept) {
        System.out.println(tripConcept);

        return ResponseEntity.ok(tripService.getBannerTrips(tripConcept));
    }

    @Operation(summary = "나의 Trips",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Trips I Joined")})
    @ResponseBody
    @GetMapping("/trips")
    public ResponseEntity<Page<TripPageResponse>> getMyTrips (
            @RequestParam("userId") UUID userId, @RequestParam("pageNo") Integer pageNo) {
        System.out.println(userId);

        return ResponseEntity.ok(tripService.getMyTrips(userId, pageNo));
    }
}
