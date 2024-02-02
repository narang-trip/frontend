package com.ssafy.userservice.db.repository;

import com.ssafy.userservice.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
//    public Optional<User> findByOauth2Id(String oauth2Id);
public Optional<User> findById(String Id);
}

