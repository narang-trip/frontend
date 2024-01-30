package com.ssafy.paymentservice.messenger;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class UserEventConsumer {

    @KafkaListener(topics = {"testing"}, groupId = "payment-test-1")
    public void testConsumer(Object data) {
        System.out.println(data);
    }

    @KafkaListener(topics = {"trip-apply"}, groupId = "payment-trip-apply")
    public void testTripApply(Object data) throws Exception {
        System.out.println(data);
    }
}
