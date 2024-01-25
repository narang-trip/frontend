package com.example.stomprabbitmq.controller;

import com.example.stomprabbitmq.Entity.Chat;
import com.example.stomprabbitmq.Entity.Chatroom;
import com.example.stomprabbitmq.dto.ChatDto;
import com.example.stomprabbitmq.repository.ChatRepository;
import com.example.stomprabbitmq.repository.ChatroomRepository;
import com.example.stomprabbitmq.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/chat")
public class ChatRoomController {
    private ChatService chatService;

    @Autowired
    public ChatRoomController(ChatService chatService){
        this.chatService = chatService;
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(ChatService.class);


//    private final RabbitTemplate template;

//    @GetMapping("/room")
//    public String chatPage() {
//        return "/chat/chat"; // "chat"는 chat.html 파일의 이름과 일치해야 합니다.
//    }
//    @PostMapping("/room")
//    public ResponseEntity<?> sendMessage(@RequestBody ChatDto message) {
//        chatService.send(message, message.getChatRoomId());
//        return ResponseEntity.ok("Message sent to RabbitMQ!");
//    }

//    @MessageMapping("chat.message.{chatRoomId}")
//    public void send(ChatDto chatDto, @DestinationVariable String chatRoomId) {
//        chatDto.setRegDate(LocalDateTime.now());
//        LOGGER.info(String.format("보낸다 !!!! 확인!!!!! -> %s", chatRoomId));
//        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId.toString(), chatDto);
//        //template.convertAndSend( "room." + chatRoomId, chat);
//        //template.convertAndSend("amq.topic", "room." + chatRoomId, chat);
//    }

//    @GetMapping("/room")
//    public ResponseEntity<String> getRoom(Long chatRoomId, String nickname, Model model) {
//        LOGGER.info(String.format("Message 확인!!!!! -> %s", chatRoomId));
//        model.addAttribute("chatRoomId", chatRoomId);
//        model.addAttribute("nickname", nickname);
//
//        return ResponseEntity.ok("Hello, this is an example!");
//    }
//
//    @PostMapping("/publish")
//    public ResponseEntity<?> sendMessage(@RequestBody ChatDto message) {
//        chatService.send(message, message.getChatRoomId().toString());
//        return ResponseEntity.ok("Message sent to RabbitMQ!");
//    }

//    private ChatService chatService;
//    private static final Logger LOGGER = LoggerFactory.getLogger(ChatService.class);
//
//    @MessageMapping("chat.enter.{chatRoomId}")
//    public void enter(ChatDto chatDto, @DestinationVariable String chatRoomId) {
//        chatService.enter(chatDto, chatRoomId);
//    }
//
//    @MessageMapping("chat.message.{chatRoomId}")
//    public void send(ChatDto chatDto, @DestinationVariable String chatRoomId) {
//        chatService.send(chatDto, chatRoomId);
//    }

//    @GetMapping("/example")
//    public ResponseEntity<String> exampleEndpoint() {
//        // 예시로 문자열을 반환하는 API 엔드포인트
//        return ResponseEntity.ok("Hello, this is an example!");
//    }

}
