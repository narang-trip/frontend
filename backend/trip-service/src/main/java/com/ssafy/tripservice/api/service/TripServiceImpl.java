package com.ssafy.tripservice.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.ssafy.tripservice.api.request.TripModifyRequest;
import com.ssafy.tripservice.api.request.TripQueryRequest;
import com.ssafy.tripservice.api.request.TripRequest;
import com.ssafy.tripservice.api.request.UserRequest;
import com.ssafy.tripservice.api.response.TripPageResponse;
import com.ssafy.tripservice.api.response.TripResponse;
import com.ssafy.tripservice.db.entity.QTrip;
import com.ssafy.tripservice.db.entity.Trip;
import com.ssafy.tripservice.db.repository.TripRepository;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.client.inject.GrpcClient;
import net.devh.boot.grpc.server.service.GrpcService;
import org.narang.lib.*;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.*;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Transactional
@Service @GrpcService
public class TripServiceImpl extends NarangGrpc.NarangImplBase implements TripService  {

    private final MongoOperations mongoTemplate;
    private final AmazonS3Client amazonS3Client;
    private final TripRepository tripRepository;

    @GrpcClient("payment-service")
    private NarangGrpc.NarangBlockingStub paymentBlockingStub;

    @GrpcClient("message-service")
    private NarangGrpc.NarangBlockingStub chatBlockingStub;

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

        ChatGrpcResponse response = chatBlockingStub.postChatRoom(
                ChatGrpcRequest.newBuilder()
                        .setChatroomName(tripRequest.getTripName())
                        .setUserId(tripRequest.getTripLeaderId().toString())
                        .build()
        );

        tripRequest.setParticipants(initialParty);
        tripRequest.setTripChatId(UUID.fromString(response.getChatroomId()));
        Trip trip = tripRequest.toEntity();

        /*
            add User To Trip
         */

        try {
            return Optional.of(tripRepository.insert(trip))
                    .map(Trip::toTripResponse);
        } catch (DataAccessException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Transactional
    @Override
    public Optional<TripResponse> modifyTrip(TripModifyRequest tripRequest, MultipartFile tripImg) {

        Optional<Trip> trip = Optional.ofNullable(mongoTemplate.findById(tripRequest.getTripId(), Trip.class));

        if (trip.isEmpty()) {
            System.out.println("그런거 없음");
            return Optional.empty();
        }

//        if (trip.get().getParticipants().size() > tripRequest.getTripParticipantsSize()) {
//            System.out.println("누구 쫓아 내야함");
//            return Optional.empty();
//        }

        Optional<String> uploadTripImgRes = Optional.of("https://youngkimi-bucket-01.s3.ap-northeast-2.amazonaws.com/airplain.jpg");

        if (tripImg != null) {
            uploadTripImgRes = uploadFile(tripImg);
        }

        // tripName, tripDesc, tripImgUrl, tripParticipantsSize

        Query query = new Query(Criteria.where("_id").is(tripRequest.getTripId()));

        Update update = new Update();

        update.set("tripName", tripRequest.getTripName());
        update.set("tripDesc", tripRequest.getTripDesc());
        update.set("tripImgUrl", uploadTripImgRes.get());
//        update.set("tripParticipantsSize", tripRequest.getTripParticipantsSize());

        return Optional.ofNullable(mongoTemplate.findAndModify(query, update, Trip.class))
                .map(Trip::toTripResponse);
    }

    @Override
    public List<TripResponse> getAvailableTrips() {

        List<TripResponse> tripResponses = new ArrayList<>();

        Iterable<Trip> tripIterable = tripRepository.findAll(
                QTrip.trip.departureDate.gt(LocalDate.now()));

        for (Trip trip : tripIterable) {

            TripResponse tripResponse = trip.toTripResponse();

            if (tripResponse.getDepartureDate().isAfter(LocalDate.now()))
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
        if (trip.get().getDepartureDate().isBefore(LocalDate.now())) {
            System.out.println("파티 이미 출발함");
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

        /*
            채팅
         */

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

        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("departureDate").ascending());

        Query query = new Query()
                .with(pageRequest)
                .skip((long) pageRequest.getPageSize() * pageRequest.getPageNumber())
                .limit(pageSize);

        query.addCriteria(Criteria.where("departureDate").gt(LocalDateTime.now()));

        List<Trip> availableTrips = mongoTemplate.find(query, Trip.class);

        return PageableExecutionUtils
                .getPage(availableTrips, pageRequest,
                        () -> mongoTemplate.count(query.skip(-1).limit(-1), Trip.class))
                .map(Trip::toTripPageResponse);
    }

    @Override
    public List<TripResponse> getBannerTrips(String tripConcept) {

        Query query = new Query(
                Criteria
                .where("departureDate")
                    .gt(LocalDateTime.now())).with(Sort.by("departureDate").ascending()).limit(24)
                .addCriteria(
                Criteria
                    .where("tripConcept").is(tripConcept)
                );

        return mongoTemplate.find(query, Trip.class)
                .stream().map(Trip::toTripResponse).toList();
    }

    @Override
    public Page<TripPageResponse> getTripsIveBeen(TripQueryRequest tripQueryRequest) {

        System.out.println(tripQueryRequest);

        final int pageSize = 4;

        PageRequest pageRequest = PageRequest.of(
                tripQueryRequest.getPageNo(), pageSize, Sort.by("departureDate").descending());

        Query query = new Query()
                .with(pageRequest)
                .skip((long) pageRequest.getPageSize() * pageRequest.getPageNumber())
                .limit(pageSize);

        query.addCriteria(
                Criteria
                        .where("participants")
                        .elemMatch(
                                Criteria.where("participantId").is(tripQueryRequest.getUserId())))
                .addCriteria(
                    (Criteria.where("departureDate").lt(tripQueryRequest.getQueryEndDate()))
                            .and("returnDate").gt(tripQueryRequest.getQuerySttDate()));

        List<Trip> myTrips = mongoTemplate.find(query, Trip.class);

        return PageableExecutionUtils
                .getPage(myTrips, pageRequest,
                        () -> mongoTemplate.count(query.skip(-1).limit(-1), Trip.class))
                .map(Trip::toTripPageResponse);
    }

    @Override
    public Page<TripPageResponse> getTripsIveOwn(TripQueryRequest tripQueryRequest) {

        final int pageSize = 4;

        PageRequest pageRequest = PageRequest.of(
                tripQueryRequest.getPageNo(), pageSize, Sort.by("departureDate").descending());

        Query query = new Query()
                .with(pageRequest)
                .skip((long) pageRequest.getPageSize() * pageRequest.getPageNumber())
                .limit(pageSize);

        query.addCriteria(
                        Criteria
                                .where("tripLeaderId").is(tripQueryRequest.getUserId())
                                .and("departureDate").gt(LocalDateTime.now()));

        List<Trip> myTrips = mongoTemplate.find(query, Trip.class);

        return PageableExecutionUtils
                .getPage(myTrips, pageRequest,
                        () -> mongoTemplate.count(query.skip(-1).limit(-1), Trip.class))
                .map(Trip::toTripPageResponse);
    }

    @Override
    public Page<TripPageResponse> getTripsIWant(TripQueryRequest tripQueryRequest) {

        System.out.println(tripQueryRequest);

        final int pageSize = 9;

        PageRequest pageRequest = PageRequest.of(
        tripQueryRequest.getPageNo(), pageSize, Sort.by("departureDate").ascending());

        List<Trip> tripsIWant = new LinkedList<>();

        Page<Trip> tripPages = tripRepository.findAll(
                QTrip.trip
                        .tripRoles.any().in(tripQueryRequest.getTripRoles())
                        .and(QTrip.trip.departureDate.before(tripQueryRequest.getQueryEndDate())
                                .and(QTrip.trip.returnDate.after(tripQueryRequest.getQuerySttDate())))
                        .and(QTrip.trip.tripParticipantsSize.goe(tripQueryRequest.getParticipantsSize()))
                        .and(QTrip.trip.tripConcept.in(tripQueryRequest.getTripConcept()))
                        .and(QTrip.trip.continent.in(tripQueryRequest.getTripContinent())), pageRequest);

        return tripPages.map(Trip::toTripPageResponse);
    }

    /*
        탈퇴 회원 가입 파티 삭제
        한개씩만 되는거 문제. 나머지 데이터 다 사라지는거 문제 : 해결 !
     */
    @Override
    public long eraseWithdrawalUser(UUID userId) {

        Query query = new Query(
                Criteria
                        .where("participants")
                        .elemMatch(
                                Criteria.where("participantId")
                                        .is(userId)));

        System.out.println(mongoTemplate.find(query, Trip.class).size());

        Update update = new Update().pull("participants", Query.query(Criteria.where("participantId").is(userId)));

        return mongoTemplate.updateMulti(query, update, Trip.class).getMatchedCount();
    }

    @Override
    public void getTripById(org.narang.lib.TripGrpcRequest request, StreamObserver<org.narang.lib.TripGrpcResponse> responseObserver) {
        Optional<Trip> trip = tripRepository.findById(UUID.fromString(request.getTripId()));

        System.out.println("REQUEST RECIVED >>>>> ");
        System.out.println("REQUEST RESULT >>>>> ");
        if (trip.isPresent()) {
            System.out.println("REQUEST RESULT EXISTS ");
        }
        else {
            System.out.println("REQUEST RESULT NOT EXISTS");
        }

        if (trip.isEmpty()) {
            responseObserver.onError(new NoSuchElementException());
            responseObserver.onCompleted();
        }
        else {
            TripGrpcResponse response = TripGrpcResponse.newBuilder()
                    .setTripId(trip.get().get_id().toString())
                    .setTripLeaderId(trip.get().getTripLeaderId().toString())
                    .setTripChatId(trip.get().getTripChatId().toString())
                    .setTripDeposit(trip.get().getTripDeposit())
                    .setTripParticipantsSize(trip.get().getTripParticipantsSize())
                    .setTripApplicantsSize(trip.get().getParticipants().size())
                    .build();

            // Plan NULL EXCEPTION

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }
}
