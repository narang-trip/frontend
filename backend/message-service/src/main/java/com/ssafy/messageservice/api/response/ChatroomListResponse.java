package com.ssafy.messageservice.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ChatroomListResponse {
    private List<ChatroomResponse> chatroomList;

    @Getter
    @AllArgsConstructor
    public static class ChatroomResponse{
        private String chatroomId;
        private String chatroomName;
        private ChatResponse chat;

        @Getter
        @AllArgsConstructor
        public static class ChatResponse {
            private String senderId;
            private String senderName;
            private String senderImgUrl;
            private String latestContent;
            @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
            private LocalDateTime latestTime;
        }
    }
}
