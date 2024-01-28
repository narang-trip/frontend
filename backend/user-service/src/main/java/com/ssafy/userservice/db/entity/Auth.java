package com.ssafy.userservice.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Auth extends BaseEntity {
    @Column(length = 40)
    private String email;
    @Column(length = 20)
    private String name;
    @Column(length = 20)
    private String provider;
    @Column
    private String providerId;
}
