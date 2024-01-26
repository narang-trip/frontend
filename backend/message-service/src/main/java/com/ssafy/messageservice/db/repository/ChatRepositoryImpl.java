package com.ssafy.messageservice.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.messageservice.db.entity.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChatRepositoryImpl {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

//    public Chat findLatestChatByChatroomId(String chatroomId){
////        QChat
//
//    }
}
