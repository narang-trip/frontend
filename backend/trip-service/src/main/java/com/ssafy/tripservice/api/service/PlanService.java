package com.ssafy.tripservice.api.service;

import com.ssafy.tripservice.db.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanService {
    private final PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository){
        this.planRepository = planRepository;
    }
}
