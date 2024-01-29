package com.ssafy.userservice.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
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

    @Builder
    public User(String id, String nickname, String gender, int ageRange, String profile_url){
        super.setId(id);
        this.nickname = nickname;
        this.gender = gender;
        this.ageRange = ageRange;
        this.profile_url = profile_url;
    }
}
