// 5. Create an object to represent a student (name, email, isActive, group, list of courses as array).
// Initialize array of 5 students.
// Find user by name.
// Find all students that are attending certain course.

class Student {
    constructor(name, email, isActive, group, courses) {
        this.name = name;
        this.email = email;
        this.isActive = isActive;
        this.group = group;
        this.courses = courses;
    }
}

const students = [
    new Student("John", "john@example.com", true, "A", ["Math", "Physics"]),
    new Student("Alice", "alice@example.com", true, "B", ["Chemistry", "Biology"]),
    new Student("Bob", "bob@example.com", false, "C", ["English", "History"]),
    new Student("Charlie", "charlie@example.com", true, "D", ["Math", "Computer Science"]),
    new Student("Eve", "eve@example.com", false, "E", ["Physics", "Chemistry"]),
];

function findStudentByName(name) {
    return students.find(student => student.name === name);
}

function findStudentsByCourse(course) {
    return students.filter(student => student.courses.includes(course));
}

console.log(findStudentByName("John"));
console.log(findStudentsByCourse("Math"));
