package com.fullstack.demo;

import com.fullstack.demo.exception.InvalidCourseException;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;
import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.exception.CourseNotFoundException;

public class CourseServiceDemo {
    public static void main(String[] args) {

        CourseService service = new CourseService(new InMemoryCourseRepository());

        // Create courses
        service.createCourse(new Course("C001", "Java Fundamentals", 14, "Beginner"));
        service.createCourse(new Course("C002", "React Frontend Development", 21, "Intermediate"));
        service.createCourse(new Course("C003", "MongoDB Basics", 14, "Beginner"));

        // Update duration
        System.out.println("=== Update Duration ===");
        service.updateDuration("C001", 20);
        System.out.println("C001 duration updated to 20 hours");

        // Delete course
        System.out.println("\n=== Delete Course ===");
        service.deleteCourse("C003");
        System.out.println("C003 deleted successfully");

        // Print remaining
        System.out.println("\n=== Remaining Courses ===");
        for (Course course : service.getAllCourses()) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        // Find deleted course
        System.out.println("\n=== Find Deleted Course ===");
        try {
            service.getCourseById("C003");
        } catch (CourseNotFoundException e) {
            System.out.println("Course not found error: " + e.getMessage());
        }

        // Invalid duration
        System.out.println("\n=== Invalid Duration Test ===");
        try {
            service.updateDuration("C001", 0);
        } catch (InvalidCourseException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}