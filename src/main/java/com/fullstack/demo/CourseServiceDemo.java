package com.fullstack.demo;

import com.fullstack.demo.exception.InvalidCourseException;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CourseServiceDemo {
    public static void main(String[] args) {

        CourseService service = new CourseService(new InMemoryCourseRepository());

        System.out.println("=== Valid Course Test ===");
        try {
            service.createCourse(new Course("C001", "Java Fundamentals", 14, "Beginner"));
            System.out.println("Course saved successfully.");
        } catch (InvalidCourseException | IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        System.out.println("\n=== Invalid Course Tests ===");

        // Invalid: empty course ID
        try {
            service.createCourse(new Course("", "Java Fundamentals", 14, "Beginner"));
        } catch (InvalidCourseException | IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        // Invalid: empty title
        try {
            service.createCourse(new Course("C002", "", 14, "Beginner"));
        } catch (InvalidCourseException | IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        // Invalid: duration is 0
        try {
            service.createCourse(new Course("C003", "MongoDB Basics", 0, "Beginner"));
        } catch (InvalidCourseException | IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        // Invalid: empty level
        try {
            service.createCourse(new Course("C004", "React Development", 21, ""));
        } catch (InvalidCourseException | IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}