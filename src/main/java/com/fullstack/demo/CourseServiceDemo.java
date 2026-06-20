package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CourseServiceDemo{
     public static void main(String[] args) {

        CourseService service = new CourseService(new InMemoryCourseRepository());

        System.out.println("=== Create Courses ===");
        service.createCourse(new Course("C001", "Java Fundamentals", 14, "Beginner"));
        service.createCourse(new Course("C002", "React Frontend Development", 21, "Intermediate"));
        service.createCourse(new Course("C003", "MongoDB Basics", 14, "Beginner"));
        System.out.println("Course saved: C001");
        System.out.println("Course saved: C002");
        System.out.println("Course saved: C003");

        System.out.println("\n=== All Courses ===");
        for (Course course : service.getAllCourses()) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }
    }
}