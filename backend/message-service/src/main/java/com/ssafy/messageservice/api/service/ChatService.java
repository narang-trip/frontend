package com.ssafy.messageservice.api.service;

//import com.example.stomprabbitmq.Entity.ChatEntity;
//import com.example.stomprabbitmq.repository.ChatRepository;

import com.ssafy.messageservice.db.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
//    private final static String CHAT_EXCHANGE_NAME = "yejin_exchange";
//    private final static String CHAT_QUEUE_NAME = "yejin";
////    @Value("${rabbitmq.exchange.name}")
////    private String exchange;
////
////    @Value("${rabbitmq.routing.key}")
////    private String routingKey;
//
//    private static final Logger LOGGER = LoggerFactory.getLogger(ChatService.class);
////    private RabbitTemplate rabbitTemplate;
//
    private final ChatRepository chatRepository;
//    private final ChatroomRepository chatroomRepository;
//    public void saveChatMessage(ChatDto chatDto) {
//        String chatRoomId = chatDto.getChatRoomId();
//        Chatroom chatroom = chatroomRepository.findById(chatRoomId).orElse(null);
//
//        if (chatroom != null) {
//
//            Chat chat = new Chat(chatDto.getId(),
//                    chatroom,
//                    chatDto.getMessage(),
//                    chatDto.getRegDate(),
//                    chatDto.getMemberId());
//            LOGGER.info(String.format("Message receive -> %s", chat));
//            chatRepository.save(chat);
//        }
//    }
//
//    public void enter(ChatDto chatDto, String chatRoomId) {
//        chatDto.setMessage("입장하셨습니다.");
//        chatDto.setRegDate(LocalDateTime.now());
//
//        // exchange
//        rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chatDto);
//
////        // JPA를 사용하여 데이터베이스에 저장
////        ChatEntity chatEntity = new ChatEntity();
////        // chatEntity에 필요한 정보를 설정
////        chatRepository.save(chatEntity);
//    }
////
//    public void send(ChatDto chatDto, String chatRoomId) {
//        chatDto.setRegDate(LocalDateTime.now());
//        LOGGER.info(String.format("Message send -> %s", chatDto));
//        rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chatDto);
//
////        // JPA를 사용하여 데이터베이스에 저장
////        ChatEntity chatEntity = new ChatEntity();
////        // chatEntity에 필요한 정보를 설정
////        chatRepository.save(chatEntity);
//    }
//
////    @RabbitListener(queues = "${rabbitmq.queue.name}")
//    @RabbitListener(queues = CHAT_QUEUE_NAME)
//    public void receive(ChatDto chatDto) {
//        LOGGER.info(String.format("Message receive -> %s", chatDto));
//        String chatRoomId = chatDto.getChatRoomId();
//        Chatroom chatroom = chatroomRepository.findById(chatRoomId).orElse(null);
//
//        if (chatroom != null) {
//
//            Chat chat = new Chat(chatDto.getId(),
//                    chatroom,
//                    chatDto.getMessage(),
//                    chatDto.getRegDate(),
//                    chatDto.getMemberId());
//            LOGGER.info(String.format("Message receive -> %s", chat));
//            chatRepository.save(chat);
//        }
//    }
}
