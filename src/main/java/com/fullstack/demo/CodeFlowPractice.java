package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CodeFlowPractice {

    public static void main(String[] args) {

        // Repository must be created first because CourseService depends on it
        CourseRepository courseRepository = new InMemoryCourseRepository();

        // CourseService needs CourseRepository to save and retrieve courses
        CourseService courseService = new CourseService(courseRepository);

        System.out.println("=== Add and Find Course ===");

        // Flow: Demo -> CourseService.createCourse -> CourseService validates
        //       -> CourseRepository.save -> InMemoryCourseRepository stores in LinkedHashMap
        Course springCourse = new Course("C004", "Spring Boot API Development", 18, "Intermediate");
        courseService.createCourse(springCourse);

        // Flow: Demo -> CourseService.getCourseById -> CourseRepository.findById
        //       -> InMemoryCourseRepository looks up LinkedHashMap -> Course returned
        Course found = courseService.getCourseById("C004");
        found.printSummary();
    }
}