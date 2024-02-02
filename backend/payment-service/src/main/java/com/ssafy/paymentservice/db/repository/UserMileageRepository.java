package com.ssafy.paymentservice.db.repository;

import com.ssafy.paymentservice.db.entity.UserMileage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMileageRepository extends JpaRepository<UserMileage, String> {

}
