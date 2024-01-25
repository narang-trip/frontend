package com.ssafy.tripservice.db.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Document(collection = "plan")
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
