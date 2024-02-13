package com.ssafy.tripservice.api.request;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.ssafy.tripservice.db.entity.Trip;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter @Setter
@ToString @RequiredArgsConstructor
public class TripQueryRequest {
    private UUID userId;
    private LocalDate querySttDate = LocalDate.of(2000, 12, 31);
    private LocalDate queryEndDate = LocalDate.of(2100, 12, 31);
    private Integer pageNo = 0;
    private Integer participantsSize = 0;
    private List<String> tripConcept = List.of("낭만", "건축", "모험", "자유", "쇼핑", "휴양", "핫플");
    private List<String> tripContinent = List.of("동아시아", "동남아시아", "중앙아시아", "서남아시아", "유럽", "오세아니아", "아프리카", "북아메리카", "남아메리카");
    private List<String> tripRoles = List.of("비기너", "트레일블레이저", "멜로디메이커", "포토그래퍼", "네비게이터", "클린메이트",
            "로드레전드", "트렌드파인더", "힐링위버", "스타일리스트", "언어위자드", "푸드파이터");
}
