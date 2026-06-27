const student = {
    studentId: 'S001',
    studentName: 'Aina Rahman',
    email: 'aina@example.com',
    status: 'Active'
};

// 1. Normal function
function formatStudent(student) {
    return student.studentId + ' - ' + student.studentName + ' (' + student.status + ')';
}

// 2. Arrow function
const getStudentEmail = (student) => {
    return student.email;
};

// 3. Short arrow function — no curly braces, returns directly
const getStudentStatus = (student) => student.status;

console.log(formatStudent(student));
console.log(getStudentEmail(student));
console.log(getStudentStatus(student));