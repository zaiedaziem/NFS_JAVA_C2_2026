package com.fullstack.demo.model;

public class Student {
    private String studentId;
    private String studentName;
    private String email;

    public Student(String studentId, String studentName, String email) {
        setStudentId(studentId);
        setStudentName(studentName);
        setEmail(email);
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = requireText(studentId, "Student ID");
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = requireText(studentName, "Student Name");
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        String cleanEmail = requireText(email, "Email");

        if (!cleanEmail.contains("@")) {
            throw new IllegalArgumentException("Email must contain @.");
        }

        this.email = cleanEmail;
    }

    public void printProfile() {
        System.out.println("Student ID: " + studentId);
        System.out.println("Name: " + studentName);
        System.out.println("Email: " + email);
        System.out.println("----------------------------");
    }

    private static String requireText(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " is required.");
        }
        return value.trim();
    }
}
