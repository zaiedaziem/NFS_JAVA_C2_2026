const student = {
    studentId: 'S001',
    studentName: 'Ignacio de Paul',
    email: 'ignacio@example.com',
    status: 'Active'
};

console.log('=== Student Object ===');
console.log(student);

console.log('\nStudent ID: ' + student.studentId);       // dot notation
console.log('Name: ' + student.studentName);             // dot notation
console.log('Email: ' + student['email']);               // bracket notation
console.log('Status: ' + student.status);               // dot notation