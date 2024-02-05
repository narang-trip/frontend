package com.ssafy.tripservice.db.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@EqualsAndHashCode(callSuper = true)
@Document(collection = "narang-plan")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Plan extends BaseEntity{
    private String planName;
    private String planRecruitDate;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private List<DailyPlan> dailyPlans;

    public static class DailyPlan {
        private String placeId;
        private String placeName;
        private String imageUrl;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
    }
}
