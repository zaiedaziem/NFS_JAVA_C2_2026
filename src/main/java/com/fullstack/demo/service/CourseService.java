package com.fullstack.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.exception.CourseNotFoundException;
import com.fullstack.demo.exception.DuplicateCourseException;
import com.fullstack.demo.exception.InvalidCourseException;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.Instructor;

public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course createCourse(Course course) {
        validateCourse(course);
        if (courseRepository.existsById(course.getCourseId())) {
            throw new DuplicateCourseException(course.getCourseId());
        }
        return courseRepository.save(course);

    }

    public Course getCourseById(String courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException(courseId));
    }
    // public Course getCourseById(String courseId) {
    //     Optional<Course> optionalCourse = courseRepository.findById(courseId);
    //     if (optionalCourse.isPresent()) {
    //         return optionalCourse.get();
    //     } else {
    //         throw new CourseNotFoundException(courseId);
    //     }
    // }
    

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    private void validateCourse(Course course) {
        if (course == null) {
            throw new InvalidCourseException("Course cannot be null.");
        }
        if (isBlank(course.getCourseId())) {
            throw new InvalidCourseException("Course ID is required.");
        }
        if (isBlank(course.getTitle())) {
            throw new InvalidCourseException("Course title is required.");
        }
        if (course.getDurationHours() <= 0) {
            throw new InvalidCourseException("Course duration must be greater than zero.");
        }
        if (isBlank(course.getLevel())) {
            throw new InvalidCourseException("Course level is required.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    public List<Course> searchByTitle(String keyword) {
        String search = keyword == null ? "" : keyword.toLowerCase();
        return courseRepository.findAll()
                .stream()
                .filter(course -> course.getTitle().toLowerCase().contains(search))
                .collect(Collectors.toList());
    }

    public List<Course> filterByLevel(String level) {
        String search = level == null ? "" : level.toLowerCase();
        return courseRepository.findAll()
                .stream()
                .filter(course -> course.getLevel().equalsIgnoreCase(search))
                .collect(Collectors.toList());
    }

    public Course assignInstructor(String courseId, Instructor instructor) {
        Course course = getCourseById(courseId);
        course.setInstructor(instructor);
        return courseRepository.save(course);
    }

    public List<Course> searchByInstructorName(String instructorName) {
        String safeInstructorName = instructorName == null ? "" : instructorName.toLowerCase();
        return courseRepository.findAll()
                .stream()
                .filter(course -> course.getInstructor() != null)
                .filter(course -> course.getInstructor().getInstructorName().toLowerCase().contains(safeInstructorName))
                .collect(Collectors.toList());
    }

    public Course updateDuration(String courseId, int newDuration) {
        if (newDuration <= 0) {
            throw new InvalidCourseException("Course duration must be greater than zero.");
        }
        Course course = getCourseById(courseId);
        course.setDurationHours(newDuration);
        return courseRepository.save(course);
    }

    public void deleteCourse(String courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new CourseNotFoundException(courseId);
        }
        courseRepository.deleteById(courseId);
    }
}

