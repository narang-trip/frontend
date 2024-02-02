package com.ssafy.messageservice.messenger;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;


@Component
public class MessageEventProducer {

//    private final KafkaTemplate<String, Object> kafkaTemplate;
//
//    public MessageEventProducer(KafkaTemplate<String, Object> kafkaTemplate) {
//        this.kafkaTemplate = kafkaTemplate;
//    }
//
//    public void publish(String topic, String message) {
//        // Topic + Message
//        kafkaTemplate.send(topic, "Message : " + message);
//    }
}
