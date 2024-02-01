package com.ssafy.messageservice.db.repository;

import com.ssafy.messageservice.db.entity.Alert;
import com.ssafy.messageservice.db.entity.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, String> {
    List<Alert> findByReceiverId(String receiverId);
}