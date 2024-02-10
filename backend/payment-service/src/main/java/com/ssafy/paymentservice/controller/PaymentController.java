package com.ssafy.paymentservice.controller;

import com.ssafy.paymentservice.db.entity.UsageRecord;
import com.ssafy.paymentservice.entity.KakaoApproveResponse;
import com.ssafy.paymentservice.entity.KakaoCancelResponse;
import com.ssafy.paymentservice.entity.KakaoReadyResponse;
import com.ssafy.paymentservice.exception.BusinessLogicException;
import com.ssafy.paymentservice.exception.ExceptionCode;
import com.ssafy.paymentservice.service.KakaoPayService;
import com.ssafy.paymentservice.service.MileageService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final KakaoPayService kakaoPayService;
    private final MileageService mileageService;
    @GetMapping("/payment")
    public String getWelcome() {
        System.out.println("payment");
        return "payment";
    }

    /**
     * 결제요청
     */
    @PostMapping("/ready")
    public ResponseEntity readyToKakaoPay(@RequestParam("user_id") String userId,
                                          @RequestParam("price") String price,
                                          @RequestParam("return_url") String returnUrl) {
        KakaoReadyResponse kakaoReady = kakaoPayService.kakaoPayReady(userId, price, returnUrl);
        return new ResponseEntity<>(kakaoReady, HttpStatus.OK);
    }

    /**
     * 결제 성공
     */
    @GetMapping("/success")
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken,
                                          @RequestParam("user_id") String userId,
                                          @RequestParam("return_url") String returnUrl) {
        KakaoApproveResponse kakaoApprove = kakaoPayService.approveResponse(pgToken, userId);
        return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, returnUrl).body(null);
//        return new ResponseEntity<>(returnUrl, HttpStatus.OK);
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public ResponseEntity cancel(@RequestParam("t_id") String tid, @RequestParam("cancel_amount") int cancelAmount,
                                 @RequestParam("tax_free") int taxFree, @RequestParam("user_id") String userId) {
        System.out.println("cancel");
        KakaoCancelResponse kakaoCancel = kakaoPayService.cancelResponse(tid, cancelAmount, taxFree, userId);
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
    
    /**
     * 마일리지 사용
     */
    @PostMapping("/use")
    public ResponseEntity use(@RequestParam("user_id") String userId, @RequestParam("price") int price, @RequestParam("trip_id") String tripId) {
        UsageRecord usageRecord = mileageService.useMileage(userId, price);
        return new ResponseEntity<>(usageRecord, HttpStatus.OK);
    }

    /**
     * 잔액 확인
     */
    @GetMapping("/balance")
    public ResponseEntity balance(@RequestParam("user_id") String userId){
        return new ResponseEntity<>(mileageService.getMileage(userId), HttpStatus.OK);
    }
}
