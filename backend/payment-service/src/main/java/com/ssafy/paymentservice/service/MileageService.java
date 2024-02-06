package com.ssafy.paymentservice.service;

import com.ssafy.paymentservice.db.entity.UsageRecord;
import com.ssafy.paymentservice.db.entity.UserMileage;
import com.ssafy.paymentservice.db.repository.UsageRecordRepository;
import com.ssafy.paymentservice.db.repository.UserMileageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MileageService {
    private final UserMileageRepository userMileageRepository;
    private final UsageRecordRepository usageRecordRepository;
    @Autowired
    private TextEncryptor textEncryptor;
    public UsageRecord useMileage(String user_id, int price){
        UserMileage userMileage = userMileageRepository.findById(user_id)
                .orElseThrow(() -> new NoSuchElementException("User mileage not found..."));
        String encryptedMileage = userMileage.getEncryptedMileage();
        // 암호화된 마일리지 복호화
        int current_mileage = Integer.parseInt(textEncryptor.decrypt(encryptedMileage));
        int new_mileage = current_mileage - price;
        String newEncryptedMileage = textEncryptor.encrypt(String.valueOf(new_mileage));
        userMileage.setEncryptedMileage(newEncryptedMileage);
        userMileageRepository.save(userMileage);

        UsageRecord usageRecord = new UsageRecord(user_id, price,
                Integer.parseInt(textEncryptor.decrypt(userMileage.getEncryptedMileage())));
        usageRecordRepository.save(usageRecord);
        return usageRecord;
    }
}
