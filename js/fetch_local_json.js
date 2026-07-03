const statusMessage = document.getElementById('status-message');
const courseList = document.getElementById('course-list');

function renderCourses(courses) {
    courseList.innerHTML = ''; // Clear previous results
    
    if (courses.length === 0) {
        statusMessage.textContent = 'No courses found.';
        return;
    }

    courses.forEach(course => {
        const courseCard = document.createElement('div');

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
async means function will do something, and it might take some time to complete, so it returns a promise.
loading data from a file or an API can take time, so we use async to handle that without the rest of the program freezing
*/
async function loadCourses() {
    try {
      // Use try-catch to handle errors
      statusMessage.textContent = "Loading courses...";
      /*
      Currently const response = await fetch("courses.json"); // fetch() request data
      in the future:
        const response = await fetch("http://localhost:8080/api/courses"); // fetch() request data
      */
      const response = await fetch("courses.json"); // fetch() request data
      if (!response.ok) {
        throw new Error("Failed to fetch courses.json");
      }
      // await waits for the result, response.json() converts JSON text into JavaScript objects
      const courses = await response.json();

      statusMessage.textContent = ""; // Clear loading message
      renderCourses(courses);
    } catch (error) {
        statusMessage.textContent = 'Error loading courses: ' + error.message;
    }
}

loadCourses();