package com.ssafy.messageservice.api.service;


import com.ssafy.messageservice.db.entity.Chatroom;
import com.ssafy.messageservice.db.entity.ChatroomUser;
import com.ssafy.messageservice.db.repository.ChatroomRepository;
import com.ssafy.messageservice.db.repository.ChatroomUserRepository;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import org.narang.lib.*;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@RequiredArgsConstructor
@GrpcService
public class GrpcMessageService extends NarangGrpc.NarangImplBase {

    private final AlertService alertService;
    private final ChatroomUserRepository chatroomUserRepository;
    private final ChatroomRepository chatroomRepository;

    @Override
    public void acceptJoinRequestType(AlertPatchGrpcRequest request, StreamObserver<AlertPatchGrpcResponse> responseObserver) {

        ResponseEntity<?> res = alertService.patchAlert(request.getAlertId(), "ACCEPT");

        if (res.getStatusCode().is2xxSuccessful())
            responseObserver.onNext(AlertPatchGrpcResponse.newBuilder().setResult(true).build());
        else
            responseObserver.onNext(AlertPatchGrpcResponse.newBuilder().setResult(false).build());
        responseObserver.onCompleted();
    }

    @Override
    public void rejectJoinRequestType(AlertPatchGrpcRequest request, StreamObserver<AlertPatchGrpcResponse> responseObserver) {
        ResponseEntity<?> res = alertService.patchAlert(request.getAlertId(), "REJECT");

        if (res.getStatusCode().is2xxSuccessful())
            responseObserver.onNext(AlertPatchGrpcResponse.newBuilder().setResult(true).build());
        else
            responseObserver.onNext(AlertPatchGrpcResponse.newBuilder().setResult(false).build());
        responseObserver.onCompleted();
    }

    @Override
    public void joinIntoChatroom(ChatroomUserPatchGrpcRequest request, StreamObserver<ChatroomUserPatchGrpcResponse> responseObserver) {
        Optional<Chatroom> chatroom = chatroomRepository.findById(request.getChatroomId());

        if (chatroom.isEmpty()) {

            chatroom = Optional.of(chatroomRepository.save(Chatroom.builder()
                    .chatroomId(request.getChatroomId())
                    .chatroomName("나랑 여행 채팅방")
                    .build()));
        }

        Optional<ChatroomUser> result = Optional.of(chatroomUserRepository.save(ChatroomUser.builder()
                        .chatroom(chatroom.get())
                        .id(request.getUserId())
                        .build()));

        responseObserver.onNext(ChatroomUserPatchGrpcResponse.newBuilder().setResult(true).build());
        responseObserver.onCompleted();
    }

    @Override
    public void exileFromChatroom(ChatroomUserPatchGrpcRequest request, StreamObserver<ChatroomUserPatchGrpcResponse> responseObserver) {

        int result = chatroomUserRepository.deleteChatroomUserByChatroomIdAndUserId(request.getChatroomId(), request.getUserId());

        if (result > 0)
            responseObserver.onNext(ChatroomUserPatchGrpcResponse.newBuilder().setResult(true).build());
        else
            responseObserver.onNext(ChatroomUserPatchGrpcResponse.newBuilder().setResult(false).build());
        responseObserver.onCompleted();
    }
}
