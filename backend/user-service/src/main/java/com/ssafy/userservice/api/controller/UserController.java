package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.request.UserInfoRequest;
import com.ssafy.userservice.api.service.UserService;
import com.ssafy.userservice.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping
    public String index(){
        System.out.println("indexxxxxxxxxxxxxxx");
        return "index";
    }

    @GetMapping("/loginForm")
    public String home() {
        System.out.println("loginForm111111111111111111");
        return "loginForm";
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
        System.out.println("sign@@@@@@@@@@@@@");
        return "signup";
    }

    // User 탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        return userService.deleteUser(id);
    }

    // User 정보 조회
    @GetMapping("/profile/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id){
        return userService.getUser(id);
    }

    // User 정보 수정
    @PatchMapping("/profile/{id}")
    public ResponseEntity<?> patchUser(@PathVariable String id, @RequestBody UserInfoRequest userInfoRequest){
        return userService.patchUser(id, userInfoRequest);
    }

//    @GetMapping("/oauth2/authorization/naver")
//    public String naverLogin() {
//        return "redirect:/oauth2/authorization/naver";
//    }
//
//    @GetMapping("/oauth2/authorization/kakao")
//    public String kakaoLogin() {
//        return "redirect:/oauth2/authorization/kakao";
//    }
}
