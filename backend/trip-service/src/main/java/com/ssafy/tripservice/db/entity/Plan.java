package com.ssafy.tripservice.db.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Getter @Entity @Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "narang-plan")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Plan extends BaseEntity {
    private String planName;
    private LocalDate lastModifiedDate;
    private String planInfo;
}
