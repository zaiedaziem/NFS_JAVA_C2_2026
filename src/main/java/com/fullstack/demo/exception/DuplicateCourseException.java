package com.fullstack.demo.exception;

public class DuplicateCourseException extends RuntimeException {
    public DuplicateCourseException(String courseId) {
        super("Course already exists with ID: " + courseId);
    }
}
