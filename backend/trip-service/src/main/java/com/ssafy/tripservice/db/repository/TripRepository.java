package com.ssafy.tripservice.db.repository;

import com.ssafy.tripservice.api.dto.TripDto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

// MongoRepository는 이미 리포지토리 빈으로 등록되어 있기에 @Repository 추가할 필요없음
public interface TripRepository extends MongoRepository<TripDto, UUID> {
}
