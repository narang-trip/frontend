package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.request.UserInfoRequest;
import com.ssafy.userservice.api.service.OAuth2Service;
import com.ssafy.userservice.api.service.UserService;
import com.ssafy.userservice.db.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;

@CrossOrigin("*")
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final OAuth2Service oAuth2Service;
//    @GetMapping("/oauth2/authorization/{provider}")
//    public RedirectView redirectToOAuth2Provider(@AuthenticationPrincipal OAuth2User principal,
//                                                 @PathVariable String provider,
//                                                 HttpServletRequest request,
//                                                 HttpServletResponse response) throws IOException {
//
//        // 이전 요청이 있다면 해당 URL로 리다이렉션, 없으면 기본 URL 사용
//        RequestCache requestCache = new HttpSessionRequestCache();
//        SavedRequest savedRequest = requestCache.getRequest(request, response);
//
//        String redirectUri = (savedRequest != null) ? savedRequest.getRedirectUrl() : "/";
//
//        // OAuth2 로그인을 위한 엔드포인트로 리다이렉션
//        return new RedirectView("https://i10a701.p.ssafy.io/oauth2/authorization/" + provider + "?redirect_uri=" + redirectUri);
//    }



    @GetMapping("/oauth2/authorization/kakao")
    public String kakaoLogin() {
        System.out.println("==========login controller 동작2345============");
        return "redirect:" + oAuth2Service.getAuthorizationUrl("kakao");
    }


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
