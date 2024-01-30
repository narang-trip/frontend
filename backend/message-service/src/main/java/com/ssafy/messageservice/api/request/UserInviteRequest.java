package com.ssafy.messageservice.api.request;

import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserInviteRequest {
    private String chatroomId;
    private String senderId;
    private List<UserListRequest> userList;

    @Getter
    @AllArgsConstructor
    public static class UserListRequest {
        private String userId;
    }
}
