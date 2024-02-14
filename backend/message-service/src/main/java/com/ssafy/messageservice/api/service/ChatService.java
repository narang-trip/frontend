package com.ssafy.messageservice.api.service;

import com.ssafy.messageservice.api.request.ChatroomRequest;
import com.ssafy.messageservice.api.response.ChatListResponse;
import com.ssafy.messageservice.api.response.ChatroomListResponse;
import com.ssafy.messageservice.db.entity.Chat;
import com.ssafy.messageservice.db.entity.Chatroom;
import com.ssafy.messageservice.db.entity.ChatroomUser;
import com.ssafy.messageservice.db.entity.User;
import com.ssafy.messageservice.db.repository.*;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;
import org.narang.lib.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service @GrpcService
public class ChatService extends NarangGrpc.NarangImplBase {
    private final ChatRepositoryCustom chatRepositoryCustom;
    private final ChatRepository chatRepository;
    private final ChatroomRepository chatroomRepository;
    private final ChatroomUserRepository chatroomUserRepository;
    private final UserRepository userRepository;

    public ChatroomListResponse getLatestChatsByUserId(String userId) {
        log.info("getLatestChatsByUserId 호출 userId : {}", userId);
        return chatRepositoryCustom.getLatestChatsByUserId(userId);
    }

    public ChatListResponse getChatMessagesByChatroomId(String chatroomId, int page) {
        // 페이지 번호는 0부터 시작하므로, PageRequest.of(page, 20)로 페이지를 가져온다 -> size는 변경 가능
        Page<Chat> chatPage = chatRepository.findByChatroomChatroomIdOrderBySendTimeDesc(chatroomId, PageRequest.of(page, 20));
        return new ChatListResponse(
                chatPage.map(chat ->
                        new ChatListResponse.ChatsResponse(
                        chat.getChatId(),
                        chat.getChatroom().getChatroomId(),
                        chat.getContent(),
                        chat.getSendTime(),
                        chat.getUserId(),
                        getName(chat.getUserId())
                )).getContent(),
                new ChatListResponse.PageResponse(
                        chatPage.getNumber(),
                        chatPage.getSize(),
                        chatPage.getNumber() * chatPage.getSize()
                ),
                chatPage.isLast(),
                chatPage.getTotalPages(),
                chatPage.getTotalElements(),
                chatPage.isFirst(),
                chatPage.getNumberOfElements()
        );
    }

    public String postChatroom(ChatroomRequest chatroomRequest){
        String chatroomId = UUID.randomUUID().toString();
        Chatroom room = new Chatroom(chatroomId, chatroomRequest.getChatroomName());
        chatroomRepository.save(room);

        ChatroomUser user = new ChatroomUser(UUID.randomUUID().toString(), room, chatroomRequest.getUserId());
        chatroomUserRepository.save(user);

        return chatroomId;
    }

    @Override
    public void postChatRoom(ChatGrpcRequest request, StreamObserver<ChatGrpcResponse> responseObserver) {

        String chatroomId = postChatroom(
                ChatroomRequest.builder()
                        .userId(request.getUserId())
                        .chatroomName(request.getChatroomName())
                        .build());

        ChatGrpcResponse response = ChatGrpcResponse.newBuilder()
                .setChatroomId(chatroomId)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    private String getName(String id) {
        Optional<User> sender = userRepository.findById(id);
        if (sender.isEmpty()){
            return "No Data";
        }
        else{
            return sender.get().getNickname();
        }
    }
}