package com.ssafy.userservice.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuth2LoginRequest {
    String code;
    String provider;
}
