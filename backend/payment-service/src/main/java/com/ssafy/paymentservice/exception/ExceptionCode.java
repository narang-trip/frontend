package com.ssafy.paymentservice.exception;

import lombok.Getter;
@Getter

public enum ExceptionCode {
    PAY_CANCEL("1000", "Pay Cancel"),
    PAY_FAILED("2000", "Pay Failed"),;

    private final String code;
    private final String message;

    ExceptionCode(final String code, final String message) {
        this.code = code;
        this.message = message;
    }
}