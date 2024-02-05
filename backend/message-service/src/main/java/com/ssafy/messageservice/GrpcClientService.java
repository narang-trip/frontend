package com.ssafy.messageservice;

//import com.ssafy.messageservice.api.service.ChatService;
//import io.grpc.StatusRuntimeException;
//import net.devh.boot.grpc.client.inject.GrpcClient;
////import org.chb.examples.lib.HelloReply;
////import org.chb.examples.lib.HelloRequest;
////import org.chb.examples.lib.SimpleGrpc;
//import org.chb.examples.lib.UserInfoGrpc;
//import org.chb.examples.lib.UserReply;
//import org.chb.examples.lib.UserRequest;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Service;
//
//@Service
//public class GrpcClientService {
//    @GrpcClient("test")
//    private UserInfoGrpc.UserInfoBlockingStub simpleStub;
//    private static final Logger LOGGER = LoggerFactory.getLogger(GrpcClientService.class);
//
//    public String sendMessage(final String userId) {
//        System.out.println("TEST . . . REQUEST SENT . . .");
//        try{
//            UserReply response = this.simpleStub.sayHello(UserRequest.newBuilder().setUserId(userId).build());
//            System.out.println(response.getUserId() + response.getUserName()+ "휷.,,");
//            return response.getUserName();
//        } catch (StatusRuntimeException e) {
//            return "FAILED with " + e.getStatus().getCode().name();
//        }
//    }
//}
