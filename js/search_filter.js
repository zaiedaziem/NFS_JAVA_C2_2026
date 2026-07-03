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

const courseList = document.getElementById("course-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

function renderCourses(courseArray) {
  courseList.innerHTML = "";

  if (courseArray.length === 0) {
    courseList.innerHTML = "<p>No courses found.</p>";
    return;
  }

  courseArray.forEach((course) => {
    const courseCard = document.createElement("div");

    courseCard.innerHTML = `
      <h2>${course.title}</h2>
      <p>Course ID: ${course.courseId}</p>
      <p>Duration: ${course.durationHours} hours</p>
      <p>Level: ${course.level}</p>
    `;

    courseList.appendChild(courseCard);
  });
}
/*
addEventListener | runs code when the user clicks the search button. It retrieves the keyword from the input field, filters the courses based on the keyword, and then renders the filtered courses. The reset button clears the input field and renders all courses again.
filter | keeps only matching courses based on the keyword. The includes method checks if the course title contains the keyword, ignoring case by converting both to lowercase.
renderCourses | updates the displayed course list based on the provided array of courses. It clears the existing content and creates new course cards for each course in the array. If no courses match, it displays a message indicating that no courses were found.

Java equivalent: searchByTitle(String keyword)
JavaScript equivalent: courses.filter(course => course.title.toLowerCase().includes(keyword.toLowerCase()))
*/
searchButton.addEventListener("click", () => {
  const keyword = searchInput.value.trim().toLowerCase();

  const results = courses.filter((course) =>{
    return course.title.toLowerCase().includes(keyword)
  });

  renderCourses(results);
});

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  renderCourses(courses);
});

renderCourses(courses);