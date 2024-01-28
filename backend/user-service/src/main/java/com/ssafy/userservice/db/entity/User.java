package com.ssafy.userservice.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User extends BaseEntity {
    @Column(length = 20)
    private String nickname;
    @Column(length = 10)
    private String gender;
    @Column
    private int ageRange;
    @Column
    private String profile_url;
}
