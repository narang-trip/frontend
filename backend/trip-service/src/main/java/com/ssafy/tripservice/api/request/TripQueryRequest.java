package com.ssafy.tripservice.api.request;

import com.ssafy.tripservice.db.entity.Trip;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter @Setter
@Builder @ToString
public class TripQueryRequest {
    private final Integer TRIP_MAX_AGE_BOUND = 7;
    private final Integer TRIP_MIN_AGE_BOUND = 0;
    private final Integer TRIP_MAX_PARTY_SIZE = 12;
    private final LocalDateTime TRIP_MIN_DATE = LocalDateTime.MIN;
    private final LocalDateTime TRIP_MAX_DATE = LocalDateTime.MAX;

    private UUID userId;
    private LocalDateTime querySttDate = TRIP_MIN_DATE;
    private LocalDateTime queryEndDate = TRIP_MAX_DATE;
    private String tripConcept;
    private String tripContinent;
    private Integer tripPageNo;
    private Integer tripAgeLowerBound = TRIP_MIN_AGE_BOUND;
    private Integer tripAgeUpperBound = TRIP_MAX_AGE_BOUND;
    private Integer participantsSize = TRIP_MAX_PARTY_SIZE;
    private List<String> tripRoles;
}
