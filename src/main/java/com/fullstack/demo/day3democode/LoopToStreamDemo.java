package com.fullstack.demo.day3democode;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

import java.util.List;

public class LoopToStreamDemo {
    public static void main(String[] args) {
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        courseService.createCourse(new Course("C001", "Java Fundamentals", 14, "Beginner"));
        courseService.createCourse(new Course("C002", "React Frontend Development", 21, "Intermediate"));
        courseService.createCourse(new Course("C003", "Advanced Java", 18, "Advanced"));
        courseService.createCourse(new Course("C004", "MongoDB Basics", 10, "Beginner"));

        System.out.println("=== Search using normal loop ===");
        List<Course> loopResults = courseService.searchByTitleUsingLoop("java");
        printCourses(loopResults);

        System.out.println("=== Search using stream ===");
        List<Course> streamResults = courseService.searchByTitle("java");
        printCourses(streamResults);
    }

    private static void printCourses(List<Course> courses) {
        if (courses.isEmpty()) {
            System.out.println("No courses found.");
            return;
        }

        for (Course course : courses) {
            course.printSummary();
        }
    }
}
