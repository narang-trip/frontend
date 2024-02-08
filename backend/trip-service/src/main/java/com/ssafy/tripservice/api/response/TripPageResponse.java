package com.ssafy.tripservice.api.response;

import com.ssafy.tripservice.db.entity.Trip;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter@Setter@Builder@ToString
public class TripPageResponse {
        private UUID tripId;
        private String tripName;
        private String tripDesc;
        private String tripImgUrl;
        private String destination;
        private LocalDateTime departureDate;
        private LocalDateTime returnDate;
        private UUID tripLeaderId;
        private Integer pageNo;
        private Integer viewCnt;
        private Integer tripParticipantsSize;
        private Integer tripAgeUpperBound;
        private Integer tripAgeLowerBound;
        private String tripConcept;
        private List<String> tripRoles;
}

