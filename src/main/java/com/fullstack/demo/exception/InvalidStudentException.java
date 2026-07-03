package com.fullstack.demo.exception;

public class InvalidStudentException extends RuntimeException {
    public InvalidStudentException(String message) {
        super(message);
    }
}
