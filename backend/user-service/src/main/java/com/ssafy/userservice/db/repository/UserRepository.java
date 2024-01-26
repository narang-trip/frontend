package com.ssafy.userservice.db.repository;

import com.ssafy.userservice.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
//    Optional<User> findByUserId(String userId);
}
