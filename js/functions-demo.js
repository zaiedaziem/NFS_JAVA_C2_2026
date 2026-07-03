// Functions and Arrow functions

const course = {
    courseId: "C001",
    title: "JavaScript Fundamentals",
    durationHours: 12,
    level: "Beginner",
    instructor: "John Doe"
};

/*
Java Syntax:
public String getSummary() {
    return courseId + " - " + title + " - Duration: " + durationHours + " hours - Level: " + level + " - Instructor: " + instructor;
}
*/

// Normal function to display course details
function formatCourse(course) {
    return `${course.courseId} - ${course.title} - Duration: ${course.durationHours} hours - Level: ${course.level} - Instructor: ${course.instructor}`;
}

// Arrow function to display course details Java lambda -> 
const formatCourseArrow = (course) => {
    return `${course.courseId} - ${course.title} - Duration: ${course.durationHours} hours - Level: ${course.level} - Instructor: ${course.instructor}`;
};

// Short arrow function to display course details
const getCourseTitle = (course) => course.title;

console.log("=== Course Details using Normal Function ===");
console.log(formatCourse(course));

console.log("\n=== Course Details using Arrow Function ===");
console.log(formatCourseArrow(course));

console.log("\n=== Course Title using Short Arrow Function ===");
console.log(getCourseTitle(course));