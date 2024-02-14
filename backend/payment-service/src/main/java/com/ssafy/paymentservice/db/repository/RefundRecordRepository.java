package com.ssafy.paymentservice.db.repository;

import com.ssafy.paymentservice.db.entity.RefundRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RefundRecordRepository extends JpaRepository<RefundRecord, UUID> {

}
