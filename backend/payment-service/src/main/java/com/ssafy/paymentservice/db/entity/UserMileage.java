package com.ssafy.paymentservice.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
public class UserMileage {
    @Id
    private String id;
    @Column
    private int mileage;
}
