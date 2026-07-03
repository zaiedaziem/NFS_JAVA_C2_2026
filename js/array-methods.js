const courses = [
  {
    courseId: "C001",
    title: "Java Fundamentals",
    durationHours: 14,
    level: "Beginner",
  },
  {
    courseId: "C002",
    title: "React Frontend Development",
    durationHours: 21,
    level: "Intermediate",
  },
  {
    courseId: "C003",
    title: "MongoDB Basics",
    durationHours: 10,
    level: "Beginner",
  },
  {
    courseId: "C004",
    title: "Spring Boot API Development",
    durationHours: 18,
    level: "Intermediate",
  },
];

/*
========= Important JavaScript Array Methods for React =========
forEach | Do something for every item | Returns undefined
filer   | Keep matching items | Returns a new array
find    | Find the first matching item | Returns the first matching item or undefined
map     | Transform each item | Returns a new array

========= Other JavaScript Array Methods =========
push    | Add an item to the end of the array | Returns the new length
pop     | Remove the last item from the array | Returns the removed item
shift   | Remove the first item from the array | Returns the removed item
unshift | Add an item to the beginning of the array | Returns the new length
*/
console.log("=== forEach: Print all course titles ===");
courses.forEach((course) => {
  console.log(course.title);
});

/*
Java Stream equivalent:
courses.stream()
    .filter(course -> course.level.equals("Beginner")).collect(Collectors
    .toList());
*/
console.log("\n=== filter: Get all beginner courses ===");
const beginnerCourses = courses.filter((course) => course.level === "Beginner");
console.log(beginnerCourses);

/*
const beginnerCourses = courses.filter((course) =>{
    return course.level === "Beginner";
});
console.log(beginnerCourses);
*/

console.log("\n=== find: Course C002 ===");

const foundCourse = courses.find((course) => {
    return course.courseId === "C002";
});
console.log(foundCourse);

console.log("\n=== map: Course titles only ===");
const courseTitles = courses.map((course) => course.title);
console.log(courseTitles);

const newLengthAfterPush = courses.push({
    courseId: "C005",
    title: "Node.js Backend Development",
    durationHours: 20,
    level: "Intermediate",
});
console.log("\n=== push: New length after adding a course ===");
console.log(courses);
console.log("New length after push: ", newLengthAfterPush);

const removedCourse = courses.pop();
console.log("\n=== pop: Removed the last course ===");
console.log(courses);
console.log("Removed course: ", removedCourse);

const newLengthAfterUnshift = courses.unshift({
    courseId: "C000",
    title: "HTML & CSS Basics",
    durationHours: 8,
    level: "Beginner",
});
console.log("\n=== unshift: New length after adding a course at the beginning ===");
console.log(courses);
console.log("New length after unshift:", newLengthAfterUnshift);

const removedFirstCourse = courses.shift();

console.log("\n=== shift: Removed the first course ===");
console.log(courses);
console.log("Remnoved first course: ", removedFirstCourse);