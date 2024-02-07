package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.service.OAuth2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/oauth2")
public class OAuth2Controller {

    @Autowired
    private OAuth2Service oAuth2Service;

    @GetMapping("/authorization/kakao")
    public String kakaoLogin() {
        System.out.println("==========login controller 동작============");
        return "redirect:" + oAuth2Service.getAuthorizationUrl("kakao");
    }
}
