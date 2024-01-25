package com.example.stomprabbitmq.repository;

import com.example.stomprabbitmq.Entity.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, String> {
}
