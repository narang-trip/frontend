package com.ssafy.messageservice.db.repository;

import com.ssafy.messageservice.db.entity.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, String> {
}
