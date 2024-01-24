package com.ssafy.tripservice.controller;

import com.ssafy.tripservice.messenger.TripEventProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/trip")
public class TripController {

//    @Autowired
//    TripEventProducer tripEventProducer;

    @GetMapping("/trip")
    public String getWelcome() {
        System.out.println("trip");
        return "trip";
    }

//    @GetMapping("/publishAsync")
//    public void publish(String topic, String message) {
//        // Topic + Message
//        CompletableFuture<?> futureResult = tripEventProducer.request(topic, message);
//
//        futureResult.whenComplete((result, exception) -> {
//            if (exception != null) {
//                exception.printStackTrace();
//            }
//            else {
//                System.out.println("DONE WELL");
//                System.out.println(futureResult);
//            }
//        });
//    }
}
