package com.ssafy.tripservice.messenger;

import org.apache.kafka.clients.producer.Callback;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;


@Component
public class TripEventProducer {
//
//    private final KafkaTemplate<String, Object> kafkaTemplate;
//
//    public TripEventProducer(KafkaTemplate<String, Object> kafkaTemplate) {
//        this.kafkaTemplate = kafkaTemplate;
//    }
//
//    /**
//     *
//     * @param topic
//     * @param message
//     */
//    @Async
//    public CompletableFuture<?> request(String topic, String message) {
//        // Topic + Message
//        CompletableFuture<SendResult<String, Object>> future = kafkaTemplate.send(topic, "message");
//
//        return CompletableFuture.completedFuture(future);
//    }
//
//    /**
//     *
//     * @param topic
//     * @param message
//     */
//    public void compensate(String topic, String message) {
//        // Topic + Message
//        kafkaTemplate.send(topic, message);
//    }
//
//    /**
//     *
//     * @param topic
//     * @param message
//     */
//    public void confirm(String topic, String message) {
//        // Topic + Message
//        kafkaTemplate.send(topic, "Message : " + message);
//    }
}
