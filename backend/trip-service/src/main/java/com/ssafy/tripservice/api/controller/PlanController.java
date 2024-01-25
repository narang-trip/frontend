package com.ssafy.tripservice.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/plan")
public class PlanController {


    @GetMapping("/plan")
    public String getWelcome() {
        System.out.println("plan");
        return "plan";
    }
}
