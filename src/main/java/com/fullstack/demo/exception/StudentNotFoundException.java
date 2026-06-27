package com.fullstack.demo.exception;

public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(String studentId) {
        // super() calls the RuntimeException constructor and passes the error message to it
        super("Student with ID " + studentId + " not found.");
    }
}