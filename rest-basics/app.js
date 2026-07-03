/* app.js 
small frontend REST client
1. GET data from the mock API and display it in the browser
2. POST data to the mock API when a form is submitted

User clicks button -> GET request to mock API -> API returns courses as JSON-> JS converts JSON into list -> display courses in browser

1. Select HTML Elements
2. Create showStatus()
3. Create renderCourses()
4. Create loadCourses()
5. Connect button click
6. Create createCourse()
7. Connect form submit
*/

const API_BASE_URL = "http://localhost:8081/api";

const statusText = document.querySelector("#statusText");
const courseList = document.querySelector("#courseList");
const loadButton = document.querySelector("#loadButton");
const createForm = document.querySelector("#createForm");
const createButton = document.querySelector("#createButton");

function showStatus(message) {
    statusText.textContent = message;
}

function renderCourses(courses) {
    courseList.innerHTML = "";

    courses.forEach(course => {
        const listItem = document.createElement("li");

        listItem.textContent =
          `${course.courseTitle} by ${course.instructorName} ` +
          `starts on ${course.startDate}. Capacity: ${course.capacity}. Status: ${course.status}`;
        
          courseList.appendChild(listItem);
    });
}

async function loadCourses() {
    showStatus("Loading courses...");

    try {
        const response = await fetch(`${API_BASE_URL}/course-offerings`);

        console.log("GET status:", response.status);

        if (!response.ok) { // true for 4xx and 5xx status codes, response.ok is true for 2xx
            throw new Error("Request failed with status " + response.status);
        } 

        const data = await response.json();

        renderCourses(data);
        showStatus(`Loaded ${data.length} courses.`);
    } catch (error) {
        showStatus(error.message);
    }
}

async function createCourse(event) {
    event.preventDefault(); // Stop the browser from submitting the form and reloading the page

    const payload = {
        courseTitle: createForm.courseTitle.value,
        instructorName: createForm.instructorName.value,
        startDate: createForm.startDate.value,
        capacity: parseInt(createForm.capacity.value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/course-offerings`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        console.log("POST status:", response.status);
        console.log("POST response:", data);

        if (!response.ok) {
            showStatus(`Error: ${data.message}`);
            return;
        }

        showStatus(`Created course offering ${data.id}.`);
        createForm.reset(); // clear the form
        await loadCourses(); // refresh the list of courses
    } catch (error) {
        showStatus(error.message);
    }
}

loadButton.addEventListener("click", loadCourses);
createForm.addEventListener("submit", createCourse);