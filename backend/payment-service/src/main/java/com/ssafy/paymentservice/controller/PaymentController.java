package com.ssafy.paymentservice.controller;

import com.ssafy.paymentservice.entity.KakaoApproveResponse;
import com.ssafy.paymentservice.entity.KakaoCancelResponse;
import com.ssafy.paymentservice.entity.KakaoReadyResponse;
import com.ssafy.paymentservice.exception.BusinessLogicException;
import com.ssafy.paymentservice.exception.ExceptionCode;
import com.ssafy.paymentservice.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final KakaoPayService kakaoPayService;
    @GetMapping("/payment")
    public String getWelcome() {
        System.out.println("payment");
        return "payment";
    }

    /**
     * 결제요청
     */
    @PostMapping("/ready")
    public ResponseEntity readyToKakaoPay() {
        KakaoReadyResponse kakaoReady = kakaoPayService.kakaoPayReady();

        return new ResponseEntity<>(kakaoReady, HttpStatus.OK);
    }

    /**
     * 결제 성공
     */
    @GetMapping("/success")
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken) {

        KakaoApproveResponse kakaoApprove = kakaoPayService.approveResponse(pgToken);

        return new ResponseEntity<>(kakaoApprove, HttpStatus.OK);
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public ResponseEntity cancel(@RequestParam("t_id") String tid, @RequestParam("cancel_amount") int cancelAmount, @RequestParam("tax_free") int taxFree) {
        System.out.println("cancel");
        KakaoCancelResponse kakaoCancel = kakaoPayService.cancelResponse(tid, cancelAmount, taxFree);
        return new ResponseEntity<>(kakaoCancel, HttpStatus.OK);
    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail")
    public void fail() {
        System.out.println("fail");
        throw new BusinessLogicException(ExceptionCode.PAY_FAILED);
    }
}
