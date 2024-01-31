package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.service.UserService;
import com.ssafy.userservice.db.entity.PrincipalDetails;
import com.ssafy.userservice.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    @ResponseBody
    @GetMapping("/welcome")
    public String getWelcome(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String uuid = principalDetails.getAuth().getId();
        return uuid; // 로그인 성공시 uuid 리턴
    }

    /**
     *
     * @param name
     * @return
     *
     * 예시 : 회원 가입 시 다른 서비스에 있는 캐시에 업데이트해야 한다.
     */
    @PostMapping("/signup")
    public String signup(@RequestBody String name) {

        return "signup";
    }

    @GetMapping("/get")
    public User getTest() {
        User user = userService.getTest("1").get();
        return user; // 로그인 성공시 uuid 리턴
    }
    
    @GetMapping("/oauth2/authorization/naver")
    public String naverLogin() {
        return "redirect:/oauth2/authorization/naver";
    }

    @GetMapping("/oauth2/authorization/kakao")
    public String kakaoLogin() {
        return "redirect:/oauth2/authorization/kakao";
    }
}
