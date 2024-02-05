package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.service.UserService;
import com.ssafy.userservice.db.entity.PrincipalDetails;
import com.ssafy.userservice.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserRestController {
    private final UserService userService;

    @GetMapping("/welcome")
    public String getWelcome(Authentication authentication) {
        System.out.println("welcome");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String uuid = principalDetails.getAuth().getId();
        return uuid; // 로그인 성공시 uuid 리턴
    }


    @GetMapping("/get")
    public User getTest() {
        User user = userService.getTest("1").get();
        return user; // 로그인 성공시 uuid 리턴
    }
}
