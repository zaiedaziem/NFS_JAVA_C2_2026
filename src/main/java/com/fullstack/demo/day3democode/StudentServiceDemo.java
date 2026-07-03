package com.fullstack.demo.day3democode;

import com.fullstack.demo.exception.StudentNotFoundException;
import com.fullstack.demo.model.Student;
import com.fullstack.demo.repository.InMemoryStudentRepository;
import com.fullstack.demo.repository.StudentRepository;
import com.fullstack.demo.service.StudentService;

import java.util.List;

public class StudentServiceDemo {
    public static void main(String[] args) {
        StudentRepository studentRepository = new InMemoryStudentRepository();
        StudentService studentService = new StudentService(studentRepository);

        studentService.registerStudent(new Student("S001", "Ali Ahmad", "ali@example.com"));
        studentService.registerStudent(new Student("S002", "Siti Aminah", "siti@example.com"));
        studentService.registerStudent(new Student("S003", "John Tan", "john@example.com"));

        System.out.println("=== All Students ===");
        printStudents(studentService.getAllStudents());

        System.out.println("=== Find Student by ID ===");
        Student foundStudent = studentService.getStudentById("S001");
        foundStudent.printProfile();

        System.out.println("=== Search Student by Name using Loop ===");
        printStudents(studentService.searchByNameUsingLoop("siti"));

        System.out.println("=== Search Student by Name using Stream ===");
        printStudents(studentService.searchByNameUsingStream("john"));

        System.out.println("=== Try to Find Missing Student ===");
        try {
            studentService.getStudentById("S999");
        } catch (StudentNotFoundException e) {
            System.out.println("Friendly message for user: " + e.getMessage());
        }
    }

    private static void printStudents(List<Student> students) {
        if (students.isEmpty()) {
            System.out.println("No students found.");
            return;
        }

        for (Student student : students) {
            student.printProfile();
        }
    }
}
