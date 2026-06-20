package com.fullstack.demo;

import java.util.ArrayList;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.model.Student;

public class Main {
    public static void main(String[] args) {

        // Instructors
        ArrayList<Instructor> instructors = new ArrayList<>();
        instructors.add(new Instructor("I001", "Alice Johnson", "Java Development"));
        instructors.add(new Instructor("I002", "Bob Smith", "React Development"));
        instructors.add(new Instructor("I003", "Carol White", "MongoDB & Databases"));

        // Courses
        ArrayList<Course> courses = new ArrayList<>();
        courses.add(new Course("C001", "Java Fundamentals", 14, "Beginner"));
        courses.add(new Course("C002", "React Frontend Development", 21, "Intermediate"));
        courses.add(new Course("C003", "MongoDB Basics", 14, "Beginner"));

        // Students
        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student("S001", "Charlie Brown", "charlie@example.com"));
        students.add(new Student("S002", "Daisy Duck", "daisy@example.com"));
        students.add(new Student("S003", "Edward Stone", "edward@example.com"));

        // Course Offerings
        ArrayList<CourseOffering> offerings = new ArrayList<>();
        offerings.add(new CourseOffering(
                "OFF001", "Java Fundamentals - June 2026 Intake",
                courses.get(0), instructors.get(0),
                "2026-06-19", "2026-07-04", 25, "Physical"));
        offerings.add(new CourseOffering(
                "OFF002", "React Frontend Development - July 2026 Intake",
                courses.get(1), instructors.get(1),
                "2026-07-07", "2026-07-25", 30, "Online"));

        // Print all instructors
        System.out.println("=== Instructor Profiles ===");
        for (Instructor instructor : instructors) {
            instructor.printProfile();
        }

        // Print all courses
        System.out.println("=== Course Summaries ===");
        for (Course course : courses) {
            course.printSummary();
        }

        // Print all students
        System.out.println("=== Student Profiles ===");
        for (Student student : students) {
            student.printProfile();
        }

        // Print all course offerings
        System.out.println("=== Course Offerings ===");
        for (CourseOffering offering : offerings) {
            offering.printSummary();
            System.out.println("----------------------------");
        }
    }
}
