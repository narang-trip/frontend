package com.ssafy.tripservice.messenger;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class TripEventConsumer {

//    @KafkaListener(topics = {"user-signup"}, groupId = "trip-test-1")
//    public void testConsumer(Object data) {
//        System.out.println(data);
//    }
}
