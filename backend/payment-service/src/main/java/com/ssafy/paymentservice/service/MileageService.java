package com.ssafy.paymentservice.service;

import com.ssafy.paymentservice.db.entity.UsageRecord;
import com.ssafy.paymentservice.db.entity.UserMileage;
import com.ssafy.paymentservice.db.repository.UsageRecordRepository;
import com.ssafy.paymentservice.db.repository.UserMileageRepository;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.client.inject.GrpcClient;
import net.devh.boot.grpc.server.service.GrpcService;
import org.narang.lib.PaymentGrpc;
import org.narang.lib.TripMileageUsageRequest;
import org.narang.lib.TripMileageUsageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service @GrpcService
@RequiredArgsConstructor
public class MileageService extends PaymentGrpc.PaymentImplBase {
    private final UserMileageRepository userMileageRepository;
    private final UsageRecordRepository usageRecordRepository;

    @Autowired
    private TextEncryptor textEncryptor;
    public int getMileage(String user_id){
        Optional<UserMileage> userMileage = userMileageRepository.findById(user_id);
        // 암호화된 마일리지 복호화
        int mileage = userMileage.map(value -> Integer.parseInt(textEncryptor.decrypt(value.getEncryptedMileage()))).orElse(0);
        return mileage;
    }
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

    /*
        Trip 아니고 Chat 에 들어가야 함 ...
     */

    @Override
    public void tripUseMileage(TripMileageUsageRequest request, StreamObserver<TripMileageUsageResponse> responseObserver) {
        UsageRecord record = useMileage(request.getUserId(), request.getPrice());

        if (record != null) {
            TripMileageUsageResponse response = TripMileageUsageResponse.newBuilder()
                    .setUserId(record.getUser_id())
                    .setBalance(record.getBalance())
                    .setPrice(record.getPrice())
                    .setRecordId(record.getId()).build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
//        responseObserver.onError(new NoSuchElementException());
    }
}
