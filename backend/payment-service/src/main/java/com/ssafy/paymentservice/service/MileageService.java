package com.ssafy.paymentservice.service;

import com.ssafy.paymentservice.db.entity.RefundRecord;
import com.ssafy.paymentservice.db.entity.UsageRecord;
import com.ssafy.paymentservice.db.entity.UserMileage;
import com.ssafy.paymentservice.db.repository.RefundRecordRepository;
import com.ssafy.paymentservice.db.repository.UsageRecordRepository;
import com.ssafy.paymentservice.db.repository.UserMileageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MileageService {
    private final UserMileageRepository userMileageRepository;
    private final UsageRecordRepository usageRecordRepository;
    private final RefundRecordRepository refundRecordRepository;
    @Autowired
    private TextEncryptor textEncryptor;
    public int getMileage(String user_id){
        Optional<UserMileage> userMileage = userMileageRepository.findById(user_id);
        // 암호화된 마일리지 복호화
        int mileage = userMileage.map(value -> Integer.parseInt(textEncryptor.decrypt(value.getEncryptedMileage()))).orElse(0);
        return mileage;
    }
    public UsageRecord useMileage(String user_id, int price){
        log.info("useMileage 호출. user_id : {}, price : {}", user_id, price);
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

    public RefundRecord cancelMileage(String usage_id){
        log.info("cancelMileage 호출. usage_id : {}", usage_id);
        UsageRecord usageRecord = usageRecordRepository.findById(usage_id)
                .orElseThrow(() -> new NoSuchElementException("Usage record not found..."));
        String user_id = usageRecord.getUserId();
        int price = usageRecord.getPrice();

        UserMileage userMileage = userMileageRepository.findById(user_id)
                .orElseThrow(() -> new NoSuchElementException("User mileage not found..."));

        String encryptedMileage = userMileage.getEncryptedMileage();
        // 암호화된 마일리지 복호화
        int current_mileage = Integer.parseInt(textEncryptor.decrypt(encryptedMileage));
        int new_mileage = current_mileage + price;
        String newEncryptedMileage = textEncryptor.encrypt(String.valueOf(new_mileage));
        userMileage.setEncryptedMileage(newEncryptedMileage);
        userMileageRepository.save(userMileage);

        RefundRecord refundRecord = new RefundRecord(user_id, price,
                Integer.parseInt(textEncryptor.decrypt(userMileage.getEncryptedMileage())));

        refundRecordRepository.save(refundRecord);
        return refundRecord;
    }
}
