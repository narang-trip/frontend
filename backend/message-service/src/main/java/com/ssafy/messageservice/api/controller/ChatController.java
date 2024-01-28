package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.response.ChatListResponse;
import com.ssafy.messageservice.api.response.ChatroomListResponse;
import com.ssafy.messageservice.api.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;
    private static final Logger LOGGER = LoggerFactory.getLogger(ChatService.class);

    // 채팅방 리스트
    @GetMapping("/list")
    public ResponseEntity<ChatroomListResponse> getLatestChatsByUserId() {
        // Todo: User 서버에서 userId랑, userName, userImgUrl 받아오자!!
        // "userId" 부분에 넣어주면 됨
        ChatroomListResponse chatroomListResponse = chatService.getLatestChatsByUserId("조예진");
        return ResponseEntity.ok(chatroomListResponse);
    }

    // 채팅방 조회 (해당 채팅방의 채팅 불러오기)
    @GetMapping("/{chatroomId}")
    public ResponseEntity<Page<ChatListResponse>> getChatMessagesByChatroomId(@PathVariable String chatroomId, @RequestParam(defaultValue = "0") int page) {
        Page<ChatListResponse> chatPage = chatService.getChatMessagesByChatroomId(chatroomId, page);
        return ResponseEntity.ok(chatPage);
    }

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
