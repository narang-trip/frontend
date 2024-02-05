package com.ssafy.paymentservice.service;

import com.ssafy.paymentservice.db.entity.ChargeRecord;
import com.ssafy.paymentservice.db.entity.UserMileage;
import com.ssafy.paymentservice.db.repository.UserMileageRepository;
import com.ssafy.paymentservice.entity.KakaoApproveResponse;
import com.ssafy.paymentservice.entity.KakaoCancelResponse;
import com.ssafy.paymentservice.entity.KakaoReadyResponse;
import com.ssafy.paymentservice.db.repository.ChargeRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoPayService {

    static final String cid = "TC0ONETIME"; // 가맹점 테스트 코드
    static final String admin_Key = "723e374a012b3d38c33794bedbd3d451"; // 공개 조심! 본인 애플리케이션의 어드민 키를 넣어주세요
    private KakaoReadyResponse kakaoReady;
    private final ChargeRecordRepository chargeRecordRepository;
    private final UserMileageRepository userMileageRepository;

    public KakaoReadyResponse kakaoPayReady(String userId, String price) {

        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id", userId);
        parameters.add("item_name", "나랑");
        parameters.add("quantity", "1");
        parameters.add("total_amount", price);
        parameters.add("tax_free_amount", "1");

        parameters.add("approval_url", "https://i10a701.p.ssafy.io/api/payment/success" + "?user_id=" + userId); // 성공 시 redirect url
        parameters.add("cancel_url", "https://i10a701.p.ssafy.io/api/payment/cancel" + "?user_id=" + userId); // 취소 시 redirect url
        parameters.add("fail_url", "https://i10a701.p.ssafy.io/api/payment/fail"); // 실패 시 redirect url

//        parameters.add("approval_url", "http://localhost:8082/api/payment/success" + "?user_id=" + userId); // 성공 시 redirect url
//        parameters.add("cancel_url", "http://localhost:8082/api/payment/cancel" + "?user_id=" + userId); // 취소 시 redirect url
//        parameters.add("fail_url", "http://localhost:8082/api/payment/fail"); // 실패 시 redirect url

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
    public KakaoApproveResponse approveResponse(String pgToken, String userId) {

        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoReady.getTid());
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id", userId);
        parameters.add("pg_token", pgToken);
        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class);
        System.out.println(approveResponse);

        if (approveResponse != null) {
            ChargeRecord chargeRecord = null;

            UserMileage userMileage = userMileageRepository.findById(userId)
                    .orElseThrow(() -> new NoSuchElementException("user not found"));

            /*
                todo
                    프론트에서 넘겨준 마일리지와 db에 저장된 마일리지 비교 필요
             */
            int new_mileage = userMileage.getMileage() + approveResponse.getAmount().getTotal();
            userMileage.setMileage(new_mileage);
            userMileageRepository.save(userMileage);

            chargeRecord = ChargeRecord.builder()
                    .tid(approveResponse.getTid())
                    .aid(approveResponse.getAid())
                    .user_id(approveResponse.getPartner_user_id())
                    .payment_method_type(approveResponse.getPayment_method_type())
                    .price(approveResponse.getAmount().getTotal())
                    .approved_at(approveResponse.getApproved_at())
                    .created_at(approveResponse.getCreated_at())
                    .build();
            chargeRecordRepository.save(chargeRecord);
        }

        return approveResponse;
    }

    /**
     * 결제 취소
     */
    public KakaoCancelResponse cancelResponse(String tid, int cancelAmount, int taxFree, String userId) {

        // 카카오 요청
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoReady.getTid());
        parameters.add("partner_user_id", userId);
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
