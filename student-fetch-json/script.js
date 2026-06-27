const statusMessage = document.getElementById('status-message');
const studentList = document.getElementById('student-list');

// Clears the list and renders a card for each student
function renderStudents(students) {
    studentList.innerHTML = '';

    students.forEach((student) => {
        const card = document.createElement('div');
        card.innerHTML = `
            <p><strong>Student ID:</strong> ${student.studentId}</p>
            <p><strong>Name:</strong> ${student.studentName}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Status:</strong> ${student.status}</p>
            <hr>
        `;
        studentList.appendChild(card);
    });
}

// async — this function is allowed to wait for tasks to finish
async function loadStudents() {
    try {
        statusMessage.textContent = 'Loading students...';

        // await — wait for the file to respond before moving to the next line
        const response = await fetch('students.json');

        if (!response.ok) {
            throw new Error('Failed to load student data.');
        }

        // await — wait for JSON to be converted into JavaScript objects
        const students = await response.json();

        statusMessage.textContent = '';
        renderStudents(students);

    } catch (error) {
        // If something goes wrong, show the error message
        statusMessage.textContent = 'Error: ' + error.message;
    }
}

// Call the function — without this line, nothing will load
loadStudents();