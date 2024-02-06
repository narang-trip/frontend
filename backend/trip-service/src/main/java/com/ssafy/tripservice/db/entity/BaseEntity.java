package com.ssafy.tripservice.db.entity;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.UUID;

@Getter
@MappedSuperclass
public class BaseEntity {

    @Id
    private UUID _id;

    public BaseEntity() {
        _id = UUID.randomUUID();
    }
}
