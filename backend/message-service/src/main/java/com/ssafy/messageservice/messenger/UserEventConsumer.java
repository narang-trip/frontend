package com.ssafy.messageservice.messenger;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class UserEventConsumer {

    @KafkaListener(topics = {"testing"}, groupId = "message-test-1")
    public void testConsumer(Object data) {
        System.out.println(data);
    }
}
