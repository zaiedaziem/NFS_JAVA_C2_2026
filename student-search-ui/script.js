const students = [
    { studentId: 'S001', studentName: 'Ignacio de Paul', email: 'ignacio@example.com', status: 'Active' },
    { studentId: 'S002', studentName: 'Ben Tan', email: 'ben@example.com', status: 'Inactive' },
    { studentId: 'S003', studentName: 'Chong Mei', email: 'mei@example.com', status: 'Active' },
    { studentId: 'S004', studentName: 'Danish Nawaz', email: 'danish@example.com', status: 'Active' }
];

const studentList = document.getElementById('student-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resetButton = document.getElementById('reset-button');

// Renders student cards — clears the list first, then shows results or a message
function renderStudents(studentArray) {
    studentList.innerHTML = '';

    if (studentArray.length === 0) {
        studentList.innerHTML = '<p>No students found.</p>';
        return;
    }

    studentArray.forEach((student) => {
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

// Search button — filter students by name
searchButton.addEventListener('click', () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = students.filter((student) =>
        student.studentName.toLowerCase().includes(keyword)
    );
    renderStudents(filtered);
});

// Reset button — clear input and show all students
resetButton.addEventListener('click', () => {
    searchInput.value = '';
    renderStudents(students);
});

// Show all students on page load
renderStudents(students);