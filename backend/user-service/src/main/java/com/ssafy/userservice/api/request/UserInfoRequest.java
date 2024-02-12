package com.ssafy.userservice.api.request;


import com.ssafy.userservice.db.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserInfoRequest {
    private String nickname;
    private String gender;
    private int ageRange;
    private String profile_url;
    private List<Role> userRoles;
}