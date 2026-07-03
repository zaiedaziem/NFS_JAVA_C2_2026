/*
Java
List<Courses> courses = new ArrayList<>(); 

JS
const courses = [];
*/

const courses = [
    {
        id: "C001",
        title: "Java Fundamentals",
        durationHours: 12,
        level: "Beginner"
    },
    {
        id: "C002",
        title: "React Frontend Development",
        durationHours: 16,
        level: "Intermediate"
    },
    {
        id: "C003",
        title: "MongoDB Basics",
        durationHours: 8,
        level: "Advanced"
    }
];

console.log("=== Course Details ===");
// `` called a backtick or grave accent, used for template literals in JavaScript
// enhanced for loop in Java is similar to for...of loop in JavaScript
for (const course of courses) {
    console.log(`${course.id} - ${course.title} - Duration: ${course.durationHours} hours - Level: ${course.level}`);
}

console.log("\nTotal Courses: " + courses.length);  // .size() in Java is .length in JavaScript