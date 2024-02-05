package com.ssafy.userservice.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    @GetMapping
    public String index(){
        System.out.println("indexxxxxxxxxxxxxxx");
        return "index";
    }

    @GetMapping("/loginForm")
    public String home() {
        System.out.println("loginForm111111111111111111");
        return "index";
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
