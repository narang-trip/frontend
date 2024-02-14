package com.ssafy.paymentservice.db.entity;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.*;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Getter
@MappedSuperclass
public class BaseEntity {


    @Id @GeneratedValue
    private String id;
    public BaseEntity() {
        id = UUID.randomUUID().toString();
    }
}
