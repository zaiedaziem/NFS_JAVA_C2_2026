package com.fullstack.demo.exception;

public class DuplicateStudentException extends RuntimeException {
    public DuplicateStudentException(String studentId) {
        super("Student already exists with ID: " + studentId);
    }
}
