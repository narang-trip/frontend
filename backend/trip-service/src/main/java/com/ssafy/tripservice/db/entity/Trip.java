package com.ssafy.tripservice.db.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.querydsl.core.annotations.QueryEntity;
import com.ssafy.tripservice.api.response.TripPageResponse;
import com.ssafy.tripservice.api.response.TripResponse;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Getter @Entity @Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "narang-trip")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Trip extends BaseEntity{

    private String tripName;
    private String tripDesc;
    private String tripImgUrl;
    private LocalDateTime recruitDate;
    private String destination;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private UUID tripLeaderId;
    private UUID tripChatId;
    private UUID tripPlanId;
    private Integer viewCnt;
    private Integer tripParticipantsSize;
    private Integer tripDeposit;
    private Integer tripAgeUpperBound;
    private Integer tripAgeLowerBound;
    private String tripConcept;
    private List<String> tripRoles;
    private List<Participant> participants;

    @Builder
    @Data
    public static class Participant {
        private List<String> userRoles;
        private UUID participantId;
        private LocalDateTime enrollmentDate;
    }

    public TripResponse toTripResponse() {
        return TripResponse.builder()
                .tripId(this.get_id())
                .tripName(this.tripName)
                .tripDesc(this.tripDesc)
                .tripImgUrl(this.tripImgUrl)
                .recruitDate(this.recruitDate)
                .destination(this.destination)
                .departureDate(this.departureDate)
                .returnDate(this.returnDate)
                .tripLeaderId(this.tripLeaderId)
                .tripChatId(this.tripChatId)
                .tripPlanId(this.tripPlanId)
                .viewCnt(this.viewCnt)
                .tripParticipantsSize(this.tripParticipantsSize)
                .tripDeposit(this.tripDeposit)
                .tripAgeUpperBound(this.tripAgeUpperBound)
                .tripAgeLowerBound(this.tripAgeLowerBound)
                .tripConcept(this.tripConcept)
                .tripRoles(this.tripRoles)
                .participants(this.participants)
                .build();
    }

    public TripPageResponse toTripPageResponse(Integer pageNo) {
        return TripPageResponse.builder()
                .pageNo(pageNo)
                .tripId(this.get_id())
                .tripName(this.tripName)
                .tripDesc(this.tripDesc)
                .tripImgUrl(this.tripImgUrl)
                .destination(this.destination)
                .departureDate(this.departureDate)
                .returnDate(this.returnDate)
                .tripLeaderId(this.tripLeaderId)
                .viewCnt(this.viewCnt)
                .tripParticipantsSize(this.tripParticipantsSize)
                .tripAgeLowerBound(this.tripAgeLowerBound)
                .tripAgeUpperBound(this.tripAgeUpperBound)
                .tripConcept(this.tripConcept)
                .tripRoles(this.tripRoles)
                .build();
    }
}
