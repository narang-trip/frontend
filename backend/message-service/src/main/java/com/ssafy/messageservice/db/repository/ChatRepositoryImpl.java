package com.ssafy.messageservice.db.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.messageservice.api.response.ChatroomListMidResponse;
import com.ssafy.messageservice.api.response.ChatroomListResponse;
import com.ssafy.messageservice.db.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Repository
@Primary
@RequiredArgsConstructor
public class ChatRepositoryImpl implements ChatRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    // 채팅방 리스트
    @Override
    public ChatroomListResponse getLatestChatsByUserId(String userId) {
        List<ChatroomListResponse.ChatroomResponse> chatroomResponses = queryFactory
                .selectDistinct(QChat.chat.chatroom.chatroomId)
                .from(QChat.chat)
                .where(QChat.chat.chatroom.chatroomId.in(
                        JPAExpressions
                                .select(QChatroomUser.chatroomUser.chatroom.chatroomId)
                                .from(QChatroomUser.chatroomUser)
                                .where(QChatroomUser.chatroomUser.userId.eq(userId))
                ))
                .fetch()
                .stream()
                .map(chatroomId -> getLatestMessageForChatroom(chatroomId, userId))
                .filter(Objects::nonNull) // null을 제외
                .sorted(Comparator.comparing(ChatroomListResponse.ChatroomResponse::getChat, Comparator.reverseOrder()))
                .toList();

        return new ChatroomListResponse(chatroomResponses);
    }

    private ChatroomListResponse.ChatroomResponse getLatestMessageForChatroom(String chatroomId, String userId) {
        // 해당 채팅방의 모든 메시지 중 가장 최근의 메시지 가져오기
        Chat latestMessage = queryFactory
                .selectFrom(QChat.chat)
                .where(QChat.chat.chatroom.chatroomId.eq(chatroomId))
                .orderBy(QChat.chat.sendTime.desc()) // sendTime 기준으로 내림차순 정렬
                .fetchFirst();

        if (latestMessage != null) {
            // 최근 메시지가 있을 경우
            return mapToChatroomResponse(latestMessage);
        }

        return null; // 최근 메시지가 없는 경우 null 반환
    }
    private ChatroomListResponse.ChatroomResponse mapToChatroomResponse(Chat chat) {
        if (chat == null) {
            // 채팅이 없는 경우 처리
            return new ChatroomListResponse.ChatroomResponse(
                    null,
                    null,
                    null, null
            );
        }

        // 임의로 넣어둠
        ChatroomListResponse.ChatroomResponse.UserResponse a1 = new ChatroomListResponse.ChatroomResponse.UserResponse("조예진", "진코");
        ChatroomListResponse.ChatroomResponse.UserResponse a2 = new ChatroomListResponse.ChatroomResponse.UserResponse("구본승", "rootwin");
        List<ChatroomListResponse.ChatroomResponse.UserResponse> users = List.of(a1, a2);

        return new ChatroomListResponse.ChatroomResponse(
                chat.getChatroom().getChatroomId(),
                chat.getChatroom().getChatroomName(),
                new ChatroomListResponse.ChatroomResponse.ChatResponse(
                        chat.getUserId(),
                        "받아",
                        chat.getContent(),
                        chat.getSendTime()
                ),users
        );
    }
}