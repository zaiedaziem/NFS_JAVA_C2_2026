package com.fullstack.demo.day3democode;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;

public class RepositoryInterfaceDemo {
    public static void main(String[] args) {
        CourseRepository courseRepository = new InMemoryCourseRepository();

        Course javaCourse = new Course("C001", "Java Fundamentals", 14, "Beginner");
        Course reactCourse = new Course("C002", "React Frontend Development", 21, "Intermediate");

        courseRepository.save(javaCourse);
        courseRepository.save(reactCourse);

        System.out.println("=== All Courses from Repository ===");
        for (Course course : courseRepository.findAll()) {
            course.printSummary();
        }

        System.out.println("=== Find One Course ===");
        courseRepository.findById("C001")
                .ifPresent(Course::printSummary);
    }
}
