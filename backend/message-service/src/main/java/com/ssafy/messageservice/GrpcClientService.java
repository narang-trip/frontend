package com.ssafy.messageservice;

import com.ssafy.messageservice.api.service.ChatService;
import io.grpc.StatusRuntimeException;
import net.devh.boot.grpc.client.inject.GrpcClient;
//import org.chb.examples.lib.HelloReply;
//import org.chb.examples.lib.HelloRequest;
//import org.chb.examples.lib.SimpleGrpc;
import org.chb.examples.lib.UserInfoGrpc;
import org.chb.examples.lib.UserReply;
import org.chb.examples.lib.UserRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class GrpcClientService {
    @GrpcClient("test")
    private UserInfoGrpc.UserInfoBlockingStub simpleStub;
    private static final Logger LOGGER = LoggerFactory.getLogger(GrpcClientService.class);

    public String sendMessage(final String userId) {
        try{
            UserReply response = this.simpleStub.sayHello(UserRequest.newBuilder().setUserId(userId).build());
            LOGGER.info(response.getUserId() + response.getUserName());
            return response.getUserName();
        } catch (StatusRuntimeException e) {
            return "FAILED with " + e.getStatus().getCode().name();
        }
    }

//    public String sendMessage(final String name) {
//        try{
//            HelloReply response = this.simpleStub.sayHello(HelloRequest.newBuilder().setName(name).build());
//            return response.getMessage();
//        } catch (StatusRuntimeException e) {
//            return "FAILED with " + e.getStatus().getCode().name();
//        }
//    }
}
