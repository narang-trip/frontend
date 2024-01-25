package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.response.ChatDto;
import com.ssafy.messageservice.api.service.ChatServiceImpl;
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

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
@Slf4j
public class StompRabbitController {
    private final RabbitTemplate template;
    private static final Logger LOGGER = LoggerFactory.getLogger(ChatServiceImpl.class);

    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";
    private final ChatRepository chatRepository;
    private final ChatroomRepository chatroomRepository;

    @MessageMapping("chat.enter.{chatRoomId}")
    public void enter(ChatDto chatDto, @DestinationVariable String chatRoomId) {

        LOGGER.info(String.format("입장 !!!! 확인!!!!! -> %s", chatRoomId));
        chatDto.setMessage("입장하셨습니다.");
        chatDto.setRegDate(LocalDateTime.now());

        // exchange
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chatDto);
        // template.convertAndSend("room." + chatRoomId, chat); //queue
        // template.convertAndSend("amq.topic", "room." + chatRoomId, chat); //topic
    }


    @MessageMapping("chat.message.{chatRoomId}")
    public void send(ChatDto chatDto, @DestinationVariable String chatRoomId) {
        chatDto.setRegDate(LocalDateTime.now());
        LOGGER.info(String.format("보낸다 !!!! 확인!!!!! -> %s", chatRoomId));
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId.toString(), chatDto);
    }

    @RabbitListener(queues = CHAT_QUEUE_NAME)
    public void receive(ChatDto chatDto) {
        LOGGER.info(String.format("받는다 !!!! 확인!!!!! -> %s", chatDto));
        String chatRoomId = chatDto.getChatRoomId();
        Chatroom chatroom = chatroomRepository.findById("1").orElse(null);
        Chat chat = new Chat("test22",
                chatroom,
                chatDto.getMessage(),
                chatDto.getRegDate(),
                chatDto.getMemberId());
        LOGGER.info(String.format("Message receive -> %s", chat));
        chatRepository.save(chat);

    }
}