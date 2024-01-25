package com.ssafy.messageservice.api.service;

import com.ssafy.messageservice.db.entity.Chat;
import org.springframework.data.jpa.repository.Query;

public interface ChatService {
    @Query("SELECT MAX(c.sendTime) FROM Chat c")
    Chat readChatroomList(String chatroomId);
}
