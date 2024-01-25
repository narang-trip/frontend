package com.ssafy.messageservice.api.request;//package com.example.stomprabbitmq.dto.request;
//
//import lombok.Getter;
//import lombok.Setter;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
///**
// * 채팅방 리스트 API
// */
//@Getter
//@Setter
//public class ChatRequest {
//    @Getter
//    public static class ChatCreateRequest {
//        private String chatroomId;
//        private List<String> userList = new ArrayList<>();
//        private String senderId;
//        private String content;
//
//        public ChatCreateRequest(String chatroomId, List<String> users, String senderId, String cotent) {
//            this.chatroomId = chatroomId;
//            this.userList.addAll(users.stream()
//                    .map(String::new).collect(Collectors.toList()));
//            this.senderId = senderId;
//            this.content = cotent;
//        }
//    }
//}
