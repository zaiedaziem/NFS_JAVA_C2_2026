package com.fullstack.demo;

public class Main {
    public static void main(String[] args) {

        Instructor instructor1 = new Instructor("I001", "Ahmad Razif", "Java & Spring Boot");

        Course course1 = new Course("C001", "Full-Stack Java Development", 140, "Intermediate", "Programming", true);
        course1.setInstructor(instructor1);

        Student student1 = new Student("S001", "Zaied Aziem", "zaied@example.com");
        Student student2 = new Student("S002", "Ali Hassan", "ali@example.com");

        System.out.println("=== Course Summary ===");
        course1.printSummary();

        System.out.println("\n=== Student Profiles ===");
        student1.printProfile();
        student2.printProfile();

        System.out.println("=== Instructor Profile ===");
        instructor1.printProfile();
    }
}
