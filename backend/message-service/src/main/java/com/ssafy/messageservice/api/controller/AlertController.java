package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.request.AlertAttendRequest;
import com.ssafy.messageservice.api.response.AlertListResponse;
import com.ssafy.messageservice.api.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/message/alert")
public class AlertController {
    private final AlertService alertService;

    // 로그인 한 유저 sse 연결 -> 로그인 버튼 눌렀을 때 호출해야 함
    @GetMapping(value = "/subscribe/{userId}", produces = "text/event-stream")
    public ResponseEntity<SseEmitter> subscribe(@PathVariable String userId,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        if (lastEventId.isEmpty()) {
            return new ResponseEntity<>(alertService.subscribe(userId, ""), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(alertService.subscribe(userId, lastEventId), HttpStatus.OK);
        }
    }

    // 여행 참여 요청 생성 + 수락/거절
    @PostMapping("/attend")
    public ResponseEntity<String> postAttendAlert(@RequestBody AlertAttendRequest alertAttendRequest) {
        boolean isAlertSent = alertService.send(alertAttendRequest);
        // 여기서 만약 alertType이 ACCEPT일 경우 프론트 측에서 stomp 통신해야 함
        if (isAlertSent) {
            // 성공적인 응답 반환
            return new ResponseEntity<>("Alert sent successfully", HttpStatus.OK);
        } else {
            // 실패 시 응답 반환
            return new ResponseEntity<>("Failed to send alert", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // userId의 지금까지의 알림 리스트 보내주기
    @GetMapping(value = "/list/{userId}")
    public ResponseEntity<AlertListResponse> subscribe(@PathVariable String userId) {
        List<AlertListResponse.AlertResponse> alertResponses = alertService.getAlertsByReceiverId(userId);
        AlertListResponse alertListResponse = new AlertListResponse(alertResponses);
        return ResponseEntity.ok(alertListResponse);
    }
}
