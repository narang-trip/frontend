package com.ssafy.messageservice.api.controller;

import com.ssafy.messageservice.api.request.AlertAttendRequest;
import com.ssafy.messageservice.api.request.ChatroomRequest;
import com.ssafy.messageservice.api.response.AlertListResponse;
import com.ssafy.messageservice.api.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Collections;
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
    public ResponseEntity<?> postAttendAlert(@RequestBody AlertAttendRequest alertAttendRequest) {
        return alertService.send(alertAttendRequest);
    }

    // userId의 지금까지의 알림 리스트 보내주기
    @GetMapping(value = "/list/{userId}")
    public ResponseEntity<AlertListResponse> getAlertList(@PathVariable String userId) {
        List<AlertListResponse.AlertResponse> alertResponses = alertService.getAlertsByReceiverId(userId);
        if(alertResponses == null){
            AlertListResponse response = new AlertListResponse();
            response.setAlertList(Collections.emptyList());
            return ResponseEntity.ok(response);
        }
        else {
            AlertListResponse alertListResponse = new AlertListResponse(alertResponses);
            return ResponseEntity.ok(alertListResponse);
        }
    }

    // sse 알림 삭제
    @DeleteMapping("/{alertId}")
    public ResponseEntity<?> deleteAlert(@PathVariable String alertId) {
        return alertService.deleteAlert(alertId);
    }

    // 여행 참여 수락 시 stomp 통신을 통해 동행자 초대
}
