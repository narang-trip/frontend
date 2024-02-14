package com.ssafy.paymentservice.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UserMileage extends BaseEntity{
    @Column
    private String userId;
    @Column
    private String encryptedMileage;
    @Builder
    public UserMileage(String userId, String encryptedMileage){
        super();
        this.userId = userId;
        this.encryptedMileage = encryptedMileage;
    }
}
