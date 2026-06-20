package com.fullstack.demo;

import com.fullstack.demo.exception.InvalidCourseException;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;
import com.fullstack.demo.model.Instructor;

public class CourseServiceDemo {
    public static void main(String[] args) {

        CourseService service = new CourseService(new InMemoryCourseRepository());

        System.out.println("=== Valid Course Test ===");
        try {
            service.createCourse(new Course("C001", "Java Fundamentals", 14, "Beginner"));
            service.createCourse(new Course("C002", "Advanced Java Backend", 21, "Intermediate"));
            service.createCourse(new Course("C003", "MongoDB Basics", 14, "Beginner"));
            service.createCourse(new Course("C004", "React Frontend Development", 21, "Intermediate"));
            System.out.println("Courses saved successfully.");
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
            service.createCourse(new Course("C005", "", 14, "Beginner"));
        } catch (InvalidCourseException | IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        // Invalid: duration is 0
        try {
            service.createCourse(new Course("C006", "MongoDB Basics", 0, "Beginner"));
        } catch (InvalidCourseException | IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        // Invalid: empty level
        try {
            service.createCourse(new Course("C007", "React Development", 21, ""));
        } catch (InvalidCourseException | IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        System.out.println("\n=== Search by Title: java ===");
        for (Course course : service.searchByTitle("java")) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        System.out.println("\n=== Filter by Level: Beginner ===");
        for (Course course : service.filterByLevel("Beginner")) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        // Assign instructor to course for testing
        Instructor instructor1 = new Instructor("I001", "Alice Johnson", "Java Development");
        service.getAllCourses().get(0).setInstructor(instructor1);

        System.out.println("\n=== Search by Instructor Name: alice ===");
        for (Course course : service.searchByInstructorName("alice")) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }
    }
}