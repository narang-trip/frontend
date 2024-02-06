package com.ssafy.tripservice.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.request.UserRequest;
import com.ssafy.tripservice.api.response.TripPageResponse;
import com.ssafy.tripservice.api.response.TripResponse;
import com.ssafy.tripservice.db.entity.QTrip;
import com.ssafy.tripservice.db.entity.Trip;
import com.ssafy.tripservice.db.repository.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.Local;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Unwrapped;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Pageable;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

@AllArgsConstructor
@Transactional
@Service
public class TripServiceImpl implements TripService {

    private final MongoOperations mongoTemplate;
    private final AmazonS3Client amazonS3Client;
    private final TripRepository tripRepository;

    @Transactional
    @Override
    public Optional<TripResponse> createTrip(TripRequest tripRequest, MultipartFile tripImg) {
        /*
            Saving Img To AWS S3
         */

        Optional<String> uploadTripImgRes = Optional.of("https://youngkimi-bucket-01.s3.ap-northeast-2.amazonaws.com/airplain.jpg");

        if (tripImg != null) {
            uploadTripImgRes = uploadFile(tripImg);
        }

        /*
            Saving Trip to mongoDB
         */
        tripRequest.setTripImgUrl(uploadTripImgRes.get());

        Trip.Participant initialParticipant
                = Trip.Participant.builder()
                .userRoles(tripRequest.getLeaderRoles())
                .participantId(tripRequest.getTripLeaderId())
                .enrollmentDate(LocalDateTime.now())
                .build();

        List<Trip.Participant> initialParty = List.of(initialParticipant);

        tripRequest.setParticipants(initialParty);
        Trip trip = tripRequest.toEntity();

        /*
            add User To Trip
         */

        try {
            tripRepository.save(trip);
            return Optional.of(trip.toTripResponse());
        } catch (DataAccessException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public List<TripResponse> getAvailableTrips() {

        List<TripResponse> tripResponses = new ArrayList<>();

        Iterable<Trip> tripIterable = tripRepository.findAll(
                QTrip.trip.departureDate.gt(LocalDateTime.now()));

        for (Trip trip : tripIterable) {

            TripResponse tripResponse = trip.toTripResponse();

            if (tripResponse.getDepartureDate().isAfter(LocalDateTime.now()))
                System.out.println(tripResponses);
            tripResponses.add(tripResponse);
        }

        return tripResponses;
    }

    @Override
    public Optional<TripResponse> getTripById(UUID tripId) {

        Query query = new Query(Criteria.where("_id").is(tripId));
        Update update = new Update();

        update.inc("viewCnt", 1);

        mongoTemplate.updateFirst(query, update, Trip.class);

        return Optional.ofNullable(mongoTemplate.findById(tripId, Trip.class))
                .map(Trip::toTripResponse);
    }

    @Override
    public Optional<TripResponse> joinTrip(UserRequest userRequest) {

        Query cntQuery = new Query(Criteria.where("_id").is(userRequest.getTripID()));

        Optional<Trip> trip = tripRepository.findById(userRequest.getTripID());

        if (trip.isEmpty()) {
            System.out.println("파티 못 찾음");
            return Optional.empty();
        }
        if (trip.get().getParticipants().size() >= trip.get().getTripParticipantsSize()) {
            System.out.println("파티 꽉 참");
            return Optional.empty();
        }
        if (trip.get().getParticipants().stream()
                .anyMatch(participant -> participant.getParticipantId().equals(userRequest.getUserId()))) {
            System.out.println("파티 이미 가입함");
            return Optional.empty();
        }

        Query query = new Query(Criteria.where("_id").is(userRequest.getTripID()));

        Trip.Participant participant
                = Trip.Participant.builder()
                .userRoles(userRequest.getUserRoles())
                .participantId(userRequest.getUserId())
                .enrollmentDate(LocalDateTime.now())
                .build();

        Update update = new Update().addToSet("participants", participant);

        UpdateResult res = mongoTemplate.updateFirst(query, update, Trip.class);

        return Optional.ofNullable(mongoTemplate.findById(userRequest.getTripID(), Trip.class))
                .map(Trip::toTripResponse);
    }

    @Override
    public boolean leaveTrip(UserRequest userRequest) {

        Query cntQuery = new Query(Criteria.where("_id").is(userRequest.getTripID()));

        Optional<Trip> trip = tripRepository.findById(userRequest.getTripID());

        if (trip.isEmpty()) {
            System.out.println("파티 못 찾음");
            return false;
        }
        if (trip.get().getTripLeaderId().equals(userRequest.getUserId())) {
            System.out.println("너가 리더 잖아");
            return false;
        }
        if (trip.get().getParticipants().stream()
                .noneMatch(participant -> participant.getParticipantId().equals(userRequest.getUserId()))) {

            for (Trip.Participant p : trip.get().getParticipants())
                System.out.println(p);

            System.out.println("파티 이미 나갔음");
            return false;
        }

        Query query = new Query(
                Criteria.where("_id").is(userRequest.getTripID()));

        List<Trip.Participant> participants = trip.get().getParticipants().stream()
                .filter(participant -> !participant.getParticipantId().equals(userRequest.getUserId()))
                .toList();

        Update update = new Update();

        update.set("participants", participants);

        UpdateResult res = mongoTemplate.upsert(query, update, Trip.class);

        return res.getModifiedCount() != 0;
    }

   @Override
    public boolean deleteTrip(UserRequest userRequest) {
        Query query = new Query(Criteria.where("_id").is(userRequest.getTripID()))
                .addCriteria(Criteria.where("tripLeaderId").is(userRequest.getUserId()));

        DeleteResult res = mongoTemplate.remove(query, Trip.class);

        if (res.getDeletedCount() == 0)
            System.out.println("그런 파티 없어요");
        return res.getDeletedCount() != 0;
    }

//    @Override
//    public List<TripPageResponse> getBannerTrips(String tripConcept) {
//        Query query = Query(Criteria.where("tripConcepts")
//                .elemMatch(Cri))
//    }

    public Optional<String> uploadFile(MultipartFile img) {

        String bucket = "youngkimi-bucket-01";

        try {
            String fileName = UUID.randomUUID().toString();
            StringBuilder fileUrl = new StringBuilder();
            fileUrl.append("https://").append(bucket).append(".s3.ap-northeast-2.amazonaws.com/").append(fileName);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(img.getContentType());
            metadata.setContentLength(img.getSize());
            amazonS3Client.putObject(bucket, fileName, img.getInputStream(), metadata);
            return Optional.of(fileUrl.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }


    public Page<TripPageResponse> getAvailableTripPages(int pageNo) {
        final int pageSize = 9;

        PageRequest pageRequest = PageRequest.of(pageSize,pageNo, Sort.by("departureDate").ascending());

        Query query = new Query()
                .with(pageRequest)
                .skip((long) pageRequest.getPageSize() * pageRequest.getPageNumber())
                .limit(pageSize);

        query.addCriteria(Criteria.where("departureDate").gt(LocalDateTime.now()));

        List<Trip> availableTrips = mongoTemplate.find(query, Trip.class);

        return PageableExecutionUtils
                .getPage(availableTrips, pageRequest,
                        () -> mongoTemplate.count(query.skip(-1).limit(-1), Trip.class))
                .map(p -> p.toTripPageResponse(pageNo));
    }
}
