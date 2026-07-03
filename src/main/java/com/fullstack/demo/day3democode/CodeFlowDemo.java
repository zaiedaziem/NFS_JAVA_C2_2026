package com.fullstack.demo.day3democode;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CodeFlowDemo {
    public static void main(String[] args) {
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        Course javaCourse = new Course("C001", "Java Fundamentals", 14, "Beginner");
        courseService.createCourse(javaCourse);

        Course foundCourse = courseService.getCourseById("C001");
        foundCourse.printSummary();
    }
}
