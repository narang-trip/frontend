package com.ssafy.messageservice.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 채팅 리스트 API 데이터
 */
@Getter
@Setter
@AllArgsConstructor
public class ChatListResponse {
    private String chatId;
    private String chatroomId;
    private String content;
    private LocalDateTime sendTime;
    private String userId;
    private String nickname;
    private String profileUrl;
//    private List<ChatsResponse> chatList;
//    private PageResponse page;
//    private boolean last;       // 마지막 페이지 여부
//    private int totalPages;     // 전체 페이지 수
//    private long totalElements; // 전체 항목 수
//    private boolean first;      // 첫번째ㅍ
//    private int numberOfElements;
//    private boolean empty;
//
//    @Getter
//    @AllArgsConstructor
//    public static class ChatsResponse {
//        private String chatId;
//        private String chatroomId;
//        private String content;
//        private LocalDateTime sendTime;
//        private String userId;
//        private String nickname;
//        private String profileUrl;
//
//    }
//
//    @Getter
//    @AllArgsConstructor
//    public static class PageResponse {
//        private String senderId;
//        private String senderName;
//        private String senderImgUrl;
//        private String latestContent;
//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
//        private LocalDateTime latestTime;
//    }

}
