package com.ssafy.messageservice.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin("*")
@RestController
@RequestMapping("/message")
public class MessageController {

    @GetMapping("/welcome")
    public String getWelcome() {
        System.out.println("welcome");
        return "welcome";
    }
}
