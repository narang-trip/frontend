package com.ssafy.paymentservice.db.entity;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.ValueGenerationType;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Getter
@MappedSuperclass
public class BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;

    public BaseEntity() {
        id = UUID.randomUUID();
    }
}
