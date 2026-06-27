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
];

/*
DOM Rendering and Manipulation

HTML = Page Structure
CSS = Page Styling
JS = Page Behavior
DOM = Document Object Model browser's object version of the HTML page
*/
const courseList = document.getElementById("course-list"); // Finding the element with id="course-list" in the HTML page

courses.forEach((course) => {
  const courseCard = document.createElement("div");         // Creating a new div element

  courseCard.innerHTML = `
    <h2>${course.title}</h2>
    <p>Course ID: ${course.courseId}</p>
    <p>Duration: ${course.durationHours} hours</p>
    <p>Level: ${course.level}</p>
  `;

  courseList.appendChild(courseCard);   // Put the new element into the page under the element with id="course-list"
});
