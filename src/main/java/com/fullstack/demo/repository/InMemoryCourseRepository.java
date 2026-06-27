package com.fullstack.demo.repository;

import com.fullstack.demo.model.Course;

import java.util.*;

public class InMemoryCourseRepository implements CourseRepository {
    private final Map<String, Course> courses = new LinkedHashMap<>();

    @Override
    public Course save(Course course) {
        courses.put(course.getCourseId(), course);
        return course;
    }

    @Override
    public Optional<Course> findById(String courseId) {
        return Optional.ofNullable(courses.get(courseId));
    }

    @Override
    public List<Course> findAll() {
        return new ArrayList<>(courses.values());
    }

    @Override
    public void deleteById(String courseId) {
        courses.remove(courseId);
    }

    @Override
    public boolean existsById(String courseId) {
        return courses.containsKey(courseId);
    }
}
