package com.example.supportdesk.exception;

public class ApiErrorResponse {
    private String message;

    public ApiErrorResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
