const students = [
  { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
  { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
  { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" }
];

console.log("=== Original Students ===");
console.log(students);

// 1. forEach — runs a function for each item, does not return anything
console.log("\n=== All Student Names ===");
students.forEach(student => {
    console.log(student.studentName);
});

// 2. filter — keeps only items where the condition is true, returns a new array
console.log("\n=== Active Students ===");
const activeStudents = students.filter((student) => student.status === "Active");
console.log(activeStudents);

// 3. find — returns the first item that matches the condition, returns one object
const foundStudent = students.find((student) => student.studentId === 'S002');
console.log('\n=== Find Student S002 ===');
console.log(foundStudent);

// 4. map — transforms each item, returns a new array with the transformed values
const studentEmails = students.map((student) => student.email);
console.log('\n=== Student Emails ===');
console.log(studentEmails);

// 5. push — adds one item to the END of the array, returns the new array length
const newLengthAfterPush = students.push({ studentId: 'S004', studentName: 'Danish Nawaz', email: 'danish@example.com', status: 'Active' });
console.log('\n=== After push ===');
console.log(students);
console.log('New length after push: ' + newLengthAfterPush);

// 6. pop — removes the LAST item from the array, returns the removed item
const removedLastStudent = students.pop();
console.log('\n=== After pop ===');
console.log(students);
console.log('Removed last student:');
console.log(removedLastStudent);

// 7. unshift — adds one item to the BEGINNING of the array, returns the new array length
const newLengthAfterUnshift = students.unshift({ studentId: 'S000', studentName: 'Ignacio de Paul', email: 'ignacio@example.com', status: 'Active' });
console.log('\n=== After unshift ===');
console.log(students);
console.log('New length after unshift: ' + newLengthAfterUnshift);

// 8. shift — removes the FIRST item from the array, returns the removed item
const removedFirstStudent = students.shift();
console.log('\n=== After shift ===');
console.log(students);
console.log('Removed first student:');
console.log(removedFirstStudent);

console.log('\n=== Final Students Array ===');
console.log(students);