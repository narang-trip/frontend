package com.ssafy.userservice.api.service;

import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.repository.AuthRepository;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.chb.examples.lib.UserInfoGrpc;
import org.chb.examples.lib.UserReply;
import org.chb.examples.lib.UserRequest;

import java.util.Optional;

@GrpcService
//@Service
public class GrpcServerService extends UserInfoGrpc.UserInfoImplBase {
    AuthRepository authRepository;
    public void sayHello(UserRequest request, StreamObserver<UserReply> responseObserver) {
        Optional<Auth> findAuth = authRepository.findById(request.getUserId());
        if(findAuth.isPresent()) {
            UserReply reply = UserReply.newBuilder()
                    .setUserName(findAuth.get().getName())
                    .build();
            responseObserver.onNext(reply);
            responseObserver.onCompleted();
        }
    }
}
