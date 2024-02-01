package com.ssafy.paymentservice.service;

import com.ssafy.paymentservice.entity.KakaoApproveResponse;
import com.ssafy.paymentservice.entity.KakaoCancelResponse;
import com.ssafy.paymentservice.entity.KakaoReadyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoPayService {

    static final String cid = "TC0ONETIME"; // 가맹점 테스트 코드
    static final String admin_Key = "723e374a012b3d38c33794bedbd3d451"; // 공개 조심! 본인 애플리케이션의 어드민 키를 넣어주세요
    private KakaoReadyResponse kakaoReady;

    public KakaoReadyResponse kakaoPayReady() {

        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("item_name", "상품명");
        parameters.add("quantity", "1");
        parameters.add("total_amount", "3000000");
        parameters.add("tax_free_amount", "1");
//        parameters.add("approval_url", "http://localhost:8080/payment/success"); // 성공 시 redirect url
//        parameters.add("cancel_url", "http://localhost:8080/payment/cancel"); // 취소 시 redirect url
//        parameters.add("fail_url", "http://localhost:8080/payment/fail"); // 실패 시 redirect url
        parameters.add("approval_url", "https://i10a701.p.ssafy.io/api/payment/success"); // 성공 시 redirect url
        parameters.add("cancel_url", "https://i10a701.p.ssafy.io/api/payment/success"); // 취소 시 redirect url
        parameters.add("fail_url", "https://i10a701.p.ssafy.io/api/payment/success"); // 실패 시 redirect url

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        kakaoReady = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoReadyResponse.class);

        return kakaoReady;
    }

    /**
     * 결제 완료 승인
     */
    public KakaoApproveResponse approveResponse(String pgToken) {

        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoReady.getTid());
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", pgToken);
        System.out.println("===========" + kakaoReady.getTid() + "===========");
        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class);

        return approveResponse;
    }

    /**
     * 결제 취소
     */
    public KakaoCancelResponse cancelResponse(String tid, int cancelAmount, int taxFree) {

        // 카카오 요청
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoReady.getTid());
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("cancel_amount", cancelAmount);
        parameters.add("tax_free_amount", taxFree);
        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class);

        return cancelResponse;
    }
    /**
     * 카카오 요구 헤더값
     */
    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + admin_Key;

        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }
}
