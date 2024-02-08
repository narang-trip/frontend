package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.request.ChatRequest;
import com.ssafy.messageservice.api.request.ChatSendRequest;
import com.ssafy.messageservice.db.entity.Chat;
import com.ssafy.messageservice.db.entity.Chatroom;
import com.ssafy.messageservice.db.entity.ChatroomUser;
import com.ssafy.messageservice.db.repository.ChatRepository;
import com.ssafy.messageservice.db.repository.ChatroomRepository;
import com.ssafy.messageservice.db.repository.ChatroomUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class StompController {
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private static final Logger LOGGER = LoggerFactory.getLogger(StompController.class);
    private final ChatRepository chatRepository;
    private final ChatroomRepository chatroomRepository;
    private final ChatroomUserRepository chatroomUserRepository;

     // Client가 SEND할 수 있는 경로
     // stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
     // "/pub/chat/enter"
    @MessageMapping(value = "/chat/enter")
    public void enter(String userId, String chatroomId){
        Instant instant = Instant.now();
        ZonedDateTime seoulTime = instant.atZone(ZoneId.of("Asia/Seoul"));
        ChatRequest chatRequest = new ChatRequest(
                chatroomId,
                userId,
                seoulTime.toLocalDateTime(),
                "채팅방에 참여하였습니다.");

        // ChatroomUser 테이블에 데이터 저장하기 -> 채팅방 입장
        Chatroom chatroom = chatroomRepository.findById(chatroomId).orElse(null);
        ChatroomUser user = new ChatroomUser(UUID.randomUUID().toString(), chatroom, userId);
        chatroomUserRepository.save(user);

        template.convertAndSend("/sub/chat/room/" + chatroomId, chatRequest);
    }

    @MessageMapping(value = "/chat/send")
    public void message(ChatSendRequest chatSendRequest){
        Instant instant = Instant.now();
        ZonedDateTime seoulTime = instant.atZone(ZoneId.of("Asia/Seoul"));
        LOGGER.info(String.format("메시지 시간 확인중 %s -> ", seoulTime));
        ChatRequest chatRequest = new ChatRequest(
                chatSendRequest.getChatroomId(),
                chatSendRequest.getSenderId(),
                seoulTime.toLocalDateTime(),
                chatSendRequest.getContent());
        template.convertAndSend("/sub/chat/room/" + chatSendRequest.getChatroomId(), chatRequest);

        // Chat 테이블에 데이터 저장하기
        Chatroom chatroom = chatroomRepository.findById(chatSendRequest.getChatroomId()).orElse(null);
        Chat chat = new Chat(UUID.randomUUID().toString(),
                chatroom,
                chatRequest.getContent(),
                chatRequest.getSendTime(),
                chatRequest.getUserId());
        LOGGER.info(String.format("Message receive -> %s",LocalDateTime.now()));
        chatRepository.save(chat);
    }


    // rabbit

//    private final RabbitTemplate template;
//    private static final Logger LOGGER = LoggerFactory.getLogger(ChatService.class);
//
//    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
//    private final static String CHAT_QUEUE_NAME = "chat.queue";
//    private final ChatRepository chatRepository;
//    private final ChatroomRepository chatroomRepository;
//    private final ChatroomUserRepository chatroomUserRepository;
//
//    // 여행 참여 요청에 대한 수락 이후 해당 메소드 호출!
//    @MessageMapping("chat.enter.{chatRoomId}")
//    public void enter(String userId, @DestinationVariable String chatRoomId) {
//        LOGGER.info(String.format("입장 !!!! 확인!!!!! -> %s", chatRoomId));
//        ChatRequest chatRequest = new ChatRequest();
//        chatRequest.setChatroomId(chatRoomId);
//        chatRequest.setUserId(userId);
//        chatRequest.setSendTime(LocalDateTime.now());
//        chatRequest.setContent("입장하셨습니다.");
//        Chatroom chatroom = chatroomRepository.findById(chatRoomId).orElse(null);
//        ChatroomUser invite = new ChatroomUser(UUID.randomUUID().toString(),chatroom, userId);
//        chatroomUserRepository.save(invite);
//        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chatRequest);
//    }
//
//    // 메시지 전송
//    @MessageMapping(value = "/chat/send")
//    public void send(ChatSendRequest chatSendRequest, @DestinationVariable String chatRoomId) {
//        ChatRequest chatRequest = new ChatRequest(
//                chatSendRequest.getChatroomId(),
//                chatSendRequest.getSenderId(),
//                LocalDateTime.now(),
//                chatSendRequest.getContent());
//        LOGGER.info(String.format("보낸다 !!!! 확인!!!!! -> %s", chatRoomId));
//        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chatRequest);
//    }
//
//    @RabbitListener(queues = CHAT_QUEUE_NAME)
//    public void receive(ChatRequest chatRequest) {
//        LOGGER.info(String.format("받는다 !!!! 확인!!!!! -> %s", chatRequest));
//        String chatRoomId = chatRequest.getChatroomId();
//        Chatroom chatroom = chatroomRepository.findById(chatRoomId).orElse(null);
//        Chat chat = new Chat(UUID.randomUUID().toString(),
//                chatroom,
//                chatRequest.getContent(),
//                chatRequest.getSendTime(),
//                chatRequest.getUserId());
//        LOGGER.info(String.format("Message receive -> %s", chat));
//        chatRepository.save(chat);
//    }
}