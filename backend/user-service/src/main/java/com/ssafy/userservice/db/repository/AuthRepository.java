package com.ssafy.userservice.db.repository;

import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Auth, String> {
    public Optional<Auth> findByName(String name);
//    public Optional<Auth> findByOauth2Id(String oauth2Id);
    public Optional<Auth> findById(String Id);
}
