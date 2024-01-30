package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.request.AlertAttendRequest;
import com.ssafy.messageservice.api.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/alert")
public class AlertController {
    private final AlertService alertService;

    // 클라이언트 구독 api
    @GetMapping(value = "/subscribe/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable String userId) {
        return alertService.subscribe(userId);
    }

    // 여행 참여 요청 생성
    @PostMapping("/attend")
    public ResponseEntity<String> postAttendAlert(@RequestBody AlertAttendRequest alertAttendRequest) {
        alertService.notify(alertAttendRequest.getReceiverId(), alertAttendRequest);
        // 성공적인 응답 반환
        return new ResponseEntity<>("Alert sent successfully", HttpStatus.OK);
    }
}
