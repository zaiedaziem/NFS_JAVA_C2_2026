package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.model.Student;

public class Main {
    public static void main(String[] args) {

        Instructor instructor1 = new Instructor("I001", "Alice Johnson", "Java Development");
        Instructor instructor2 = new Instructor("I002", "Bob Smith", "React Development");

        Course course1 = new Course("C001", "Java Fundamentals", 14, "Beginner");
        Course course2 = new Course("C002", "React Frontend Development", 21, "Intermediate");

        Student student1 = new Student("S001", "Charlie Brown", "charlie@example.com");
        Student student2 = new Student("S002", "Daisy Duck", "daisy@example.com");

        course1.setInstructor(instructor1);
        course2.setInstructor(instructor2);

        System.out.println("=== Instructor Profiles ===");
        instructor1.printProfile();
        instructor2.printProfile();

        System.out.println("=== Course Summaries ===");
        course1.printSummary();
        course2.printSummary();

        System.out.println("=== Student Profiles ===");
        student1.printProfile();
        student2.printProfile();
    }
}
