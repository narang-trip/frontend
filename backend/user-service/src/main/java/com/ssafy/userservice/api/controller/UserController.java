package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@CrossOrigin("*")
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    @GetMapping("oauth2/authorize/{provider}")
    public RedirectView redirectToOAuth2Provider(@PathVariable(name = "provider") String provider) {
        System.out.println("hey hey!");
//        String url = "http://localhost:8081/oauth2/authorization/" + provider;
        String url = "https://i10a701.p.ssafy.io/oauth2/authorization/" + provider;
        return new RedirectView(url);
    }

    @GetMapping("oauth2/authorize/kakao")
    public RedirectView redirectToOAuth2Kakao() {
        System.out.println("hey hey!2222222222");
//        String url = "http://localhost:8081/oauth2/authorization/kakao";
        String url = "https://i10a701.p.ssafy.io/oauth2/authorization/kakao";
        return new RedirectView(url);
    }

    @GetMapping
    public String index(){
        System.out.println("indexxxxxxxxxxxxxxx");
        return "index";
    }
    @GetMapping("/loginForm4")
    public String home4() {
        System.out.println("loginForm4444444444444");
        return "loginForm";
    }
    @GetMapping("/loginForm3")
    public String home3() {
        System.out.println("loginForm333333333333333");
        return "loginForm";
    }
    @GetMapping("/loginForm2")
    public String home2() {
        System.out.println("loginForm222222222222222");
        return "loginForm";
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
