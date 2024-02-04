package com.ssafy.tripservice.db.entity;

import lombok.*;
import org.bson.codecs.UuidCodecProvider;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.UUID;

@Getter
public class BaseEntity {

    private UUID _id;

    public BaseEntity() {
        _id = UUID.randomUUID();
    }
}
