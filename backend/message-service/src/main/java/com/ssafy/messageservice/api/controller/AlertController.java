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
@RequestMapping("/api/message/alert")
public class AlertController {
    private final AlertService alertService;

    // 로그인 한 유저 sse 연결 -> 로그인 버튼 눌렀을 때 호출해야 함
    @GetMapping(value = "/subscribe/{userId}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable String userId,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return alertService.subscribe(userId, lastEventId);
    }

    // 여행 참여 요청 생성 + 수락/거절
    @PostMapping("/attend")
    public ResponseEntity<String> postAttendAlert(@RequestBody AlertAttendRequest alertAttendRequest) {
        boolean isAlertSent = alertService.send(alertAttendRequest);
        // 여기서 만약 alertType이 ACCEPT일 경우 프론트 측에서
        if (isAlertSent) {
            // 성공적인 응답 반환
            return new ResponseEntity<>("Alert sent successfully", HttpStatus.OK);
        } else {
            // 실패 시 응답 반환
            return new ResponseEntity<>("Failed to send alert", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
