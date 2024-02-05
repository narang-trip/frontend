package com.ssafy.messageservice.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatroomRequest {
    private String chatroomId;
    private String chatroomName;
    private String userId;
}
