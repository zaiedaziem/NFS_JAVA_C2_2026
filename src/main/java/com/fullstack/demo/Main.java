package com.fullstack.demo;

public class Main {
    public static void main(String[] args) {

        // Instructors
        Instructor instructor1 = new Instructor("I001", "Ahmad Razif", "Java & Spring Boot");
        Instructor instructor2 = new Instructor("I002", "Aina Rahman", "Frontend & React");

        // Courses
        Course course1 = new Course("C001", "Full-Stack Java Development", 140, "Intermediate", "Programming", true);
        Course course2 = new Course("C002", "React & Frontend Essentials", 60, "Beginner", "Frontend", true);

        // Course Offerings
        CourseOffering offering1 = new CourseOffering(
                "OFF001",
                "Full-Stack Java Development - June 2026 Intake",
                course1,
                instructor1,
                "2026-06-19",
                "2026-07-18",
                25,
                "Physical"
        );

        CourseOffering offering2 = new CourseOffering(
                "OFF002",
                "React & Frontend Essentials - July 2026 Intake",
                course2,
                instructor2,
                "2026-07-21",
                "2026-08-08",
                30,
                "Online"
        );

        // Students
        Student student1 = new Student("S001", "Zaied Aziem", "zaied@example.com");
        Student student2 = new Student("S002", "Ali Hassan", "ali@example.com");

        System.out.println("=== Course Offering Summaries ===\n");
        offering1.printOfferingSummary();
        System.out.println();
        offering2.printOfferingSummary();

        System.out.println("\n=== Student Profiles ===");
        student1.printProfile();
        student2.printProfile();
    }
}
