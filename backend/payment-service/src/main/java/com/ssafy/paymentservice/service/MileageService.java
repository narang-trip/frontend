package com.ssafy.paymentservice.service;

import com.ssafy.paymentservice.db.entity.UsageRecord;
import com.ssafy.paymentservice.db.entity.UserMileage;
import com.ssafy.paymentservice.db.repository.UsageRecordRepository;
import com.ssafy.paymentservice.db.repository.UserMileageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MileageService {
    private final UserMileageRepository userMileageRepository;
    private final UsageRecordRepository usageRecordRepository;
    public UsageRecord useMileage(String user_id, int price){
        UserMileage userMileage = userMileageRepository.findById(user_id)
                .orElseThrow(() -> new NoSuchElementException("User mileage not found..."));
        userMileage.setMileage(userMileage.getMileage() - price);
        userMileageRepository.save(userMileage);
        UsageRecord usageRecord = new UsageRecord(user_id, price, userMileage.getMileage());
        usageRecordRepository.save(usageRecord);
        return usageRecord;
    }
}
