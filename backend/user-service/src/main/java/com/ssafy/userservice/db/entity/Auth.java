package com.ssafy.userservice.db.entity;

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
public class Auth extends BaseEntity {
    @Column(length = 40)
    private String email;
    @Column(length = 20)
    private String name;
    @Column(length = 20)
    private String provider;
    @Column
    private String providerId;
    @Column
    private String authority;

    @Builder
    public Auth(String id, String email, String name, String provider, String providerId, String authority){
        super.setId(id);
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.providerId = providerId;
        this.authority = authority;
    }
}
