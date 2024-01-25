package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/chat")
public class ChatRoomController {
    private ChatService chatService;

    @Autowired
    public ChatRoomController(ChatService chatService){
        this.chatService = chatService;
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(ChatService.class);

    // 채팅방 리스트
//    @GetMapping("/list")
//    public ResponseEntity<String> getChatrooms(Long chatRoomId, String nickname) {
//        LOGGER.info(String.format("Message 확인!!!!! -> %s", chatRoomId));
//        return ResponseEntity.ok("Hello, this is an example!");
//    }
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

    @GetMapping("/example")
    public ResponseEntity<String> exampleEndpoint() {
        // 예시로 문자열을 반환하는 API 엔드포인트
        return ResponseEntity.ok("Hello, this is an example!");
    }

}
