package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.request.ChatRequest;
import com.ssafy.messageservice.api.request.ChatSendRequest;
import com.ssafy.messageservice.api.request.UserInviteRequest;
import com.ssafy.messageservice.api.service.ChatService;
import com.ssafy.messageservice.db.entity.Chat;
import com.ssafy.messageservice.db.entity.Chatroom;
import com.ssafy.messageservice.db.repository.ChatRepository;
import com.ssafy.messageservice.db.repository.ChatroomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.UUID;

@CrossOrigin("*")
@Controller
@RequiredArgsConstructor
@Slf4j
public class StompRabbitController {
    private final RabbitTemplate template;
    private static final Logger LOGGER = LoggerFactory.getLogger(ChatService.class);

    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";
    private final ChatRepository chatRepository;
    private final ChatroomRepository chatroomRepository;


    // todo: 알림을 통해 정보 얻기
    @MessageMapping("chat.enter.{chatRoomId}")
    public void enter(UserInviteRequest inviteRequest, @DestinationVariable String chatRoomId) {
        LOGGER.info(String.format("입장 !!!! 확인!!!!! -> %s", chatRoomId));
        ChatRequest chatRequest = new ChatRequest();
        chatRequest.setChatroomId(chatRoomId);
        chatRequest.setSenderId(inviteRequest.getSenderId());
        chatRequest.setContent("입장하셨습니다.");
        // exchange
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chatRequest);

    }

    @MessageMapping("chat.message.{chatRoomId}")
    public void send(ChatSendRequest chatSendRequest, @DestinationVariable String chatRoomId) {
        ChatRequest chatRequest = new ChatRequest(
                chatSendRequest.getChatroomId(),
                chatSendRequest.getSenderId(),
                LocalDateTime.now(),
                chatSendRequest.getContent());
        LOGGER.info(String.format("보낸다 !!!! 확인!!!!! -> %s", chatRoomId));
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chatRequest);
    }

    @RabbitListener(queues = CHAT_QUEUE_NAME)
    public void receive(ChatRequest chatRequest) {
        LOGGER.info(String.format("받는다 !!!! 확인!!!!! -> %s", chatRequest));
        String chatRoomId = chatRequest.getChatroomId();
        Chatroom chatroom = chatroomRepository.findById(chatRoomId).orElse(null);
        Chat chat = new Chat(UUID.randomUUID().toString(),
                chatroom,
                chatRequest.getContent(),
                chatRequest.getSendTime(),
                chatRequest.getSenderId());
        LOGGER.info(String.format("Message receive -> %s", chat));
        chatRepository.save(chat);
    }
}