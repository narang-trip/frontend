package com.ssafy.messageservice;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GrpcClientController {
    private final GrpcClientService grpcClientService;

    // 되는거까지 확인 완료
    @GetMapping("/test")
    public String printMessage() {
        return grpcClientService.sendMessage("조예진");
    }
}
