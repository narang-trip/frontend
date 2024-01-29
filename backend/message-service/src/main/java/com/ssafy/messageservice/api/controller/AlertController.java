package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.response.AlertAttendRequest;
import com.ssafy.messageservice.api.response.ChatDto;
import com.ssafy.messageservice.api.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/alert")
public class AlertController {
    private final AlertService alertService;

    // 여행 참여 요청 생성
    @PostMapping("/attend")
    public ResponseEntity<String> postAttendAlert(@RequestBody AlertAttendRequest alertAttendRequest) {
        alertService.notify(alertAttendRequest.getReceiverId(), alertAttendRequest);
        // 성공적인 응답 반환
        return new ResponseEntity<>("Alert sent successfully", HttpStatus.OK);
    }
}
