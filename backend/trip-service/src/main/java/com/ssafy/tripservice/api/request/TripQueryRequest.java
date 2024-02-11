package com.ssafy.tripservice.api.request;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.ssafy.tripservice.db.entity.Trip;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter @Setter
@ToString @RequiredArgsConstructor
public class TripQueryRequest {
    private UUID userId;
    private LocalDateTime querySttDate = LocalDateTime.of(2000, 12, 31, 0, 0);
    private LocalDateTime queryEndDate = LocalDateTime.of(2100, 12, 31, 0, 0);
    private List<String> tripConcept = List.of("낭만", "건축", "모험", "자유", "쇼핑", "휴양", "핫플");
    private List<String> tripContinent = List.of("동아시아", "동남아시아", "중앙아시아", "서남아시아", "유럽", "오세아니아", "아프리카", "북아메리카", "남아메리카");
    private Integer tripPageNo = 0;
    private Integer tripAgeLowerBound = 0;
    private Integer tripAgeUpperBound = 7;
    private Integer participantsSize = 0;
    private List<String> tripRoles = List.of("노세희", "조용환", "조예진", "구본승", "송윤재", "김영섭");
}
