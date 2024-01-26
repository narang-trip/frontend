package com.ssafy.messageservice.db.repository;

import com.ssafy.messageservice.db.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, String> {
}
