package com.ssafy.messageservice.db.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public interface EmitterRepository {
    public SseEmitter save(String id, SseEmitter sseEmitter);
    public void saveEventCache(String eventCacheId, Object event);
    public Map<String, SseEmitter> findAllEmitterStartWithByUserId(String userId);
    public Map<String, Object> findAllEventCacheStartWithByUserId(String userId);
    public void deleteById(String id);
    public void deleteAllEmitterStartWithId(String userId);
    public void deleteAllEventCacheStartWithId(String userId);
}
