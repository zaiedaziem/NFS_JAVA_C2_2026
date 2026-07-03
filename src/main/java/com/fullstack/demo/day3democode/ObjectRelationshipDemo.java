package com.fullstack.demo.day3democode;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;

public class ObjectRelationshipDemo {
    public static void main(String[] args) {
        Instructor instructor = new Instructor("I001", "Aina Rahman", "Java and Spring Boot");
        Course course = new Course("C001", "Java Fundamentals", 14, "Beginner");

        course.setInstructor(instructor);

        CourseOffering offering = new CourseOffering(
                "OFF001",
                "Java Fundamentals - June Intake",
                course,
                instructor,
                "2026-06-25",
                "2026-06-26",
                25,
                "Physical"
        );

        System.out.println("=== Course has an Instructor ===");
        course.printSummary();

        System.out.println("=== CourseOffering has a Course and Instructor ===");
        offering.printSummary();
    }
}
