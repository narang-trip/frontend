package com.ssafy.messageservice.db.repository;

import com.ssafy.messageservice.db.entity.Chat;
import com.ssafy.messageservice.db.entity.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, String> {
    // todo: Auth 서버로부터 데이터 받아오기
    @Query("select cr from ChatroomUser cr where cr.userId = :userId")
    Optional<Chatroom> getChatroomsByUserId(@Param("userId") String userId);
    // chatroomId를 통해 가장 최근 메시지를 가져온다.
    List<Chat> findLatestChatByChatroomId(String chatroomId);

}
