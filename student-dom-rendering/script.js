const students = [
    { studentId: 'S001', studentName: 'Ignacio de Paul', email: 'ignacio@example.com', status: 'Active' },
    { studentId: 'S002', studentName: 'Ben Tan', email: 'ben@example.com', status: 'Inactive' },
    { studentId: 'S003', studentName: 'Chong Mei', email: 'mei@example.com', status: 'Active' },
    { studentId: 'S004', studentName: 'Danish Nawaz', email: 'danish@example.com', status: 'Active' }
];

// Select the div where cards will be added
const studentList = document.getElementById('student-list');

// Loop through each student and create a card
students.forEach((student) => {
    // Create a new div element for the card
    const card = document.createElement('div');

    // Put student details inside the card
    card.innerHTML = `
        <p><strong>Student ID:</strong> ${student.studentId}</p>
        <p><strong>Name:</strong> ${student.studentName}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Status:</strong> ${student.status}</p>
        <hr>
    `;

    // Add the card to the page
    studentList.appendChild(card);
});