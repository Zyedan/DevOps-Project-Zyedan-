async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:5050/students');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Failed to fetch students:', error);
    }
}

function displayStudents(students) {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; 

    students.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student');

        studentDiv.innerHTML = `
            <h3>${student.firstName} ${student.lastName}</h3>
            <p><strong>Admission ID:</strong> ${student.admissionID}</p>
            <p><strong>Date of Birth:</strong> ${student.dateOfBirth}</p>
            <p><strong>Gender:</strong> ${student.gender}</p>
            <p><strong>Email:</strong> ${student.emailAddress}</p>
            <p><strong>Phone:</strong> ${student.phoneNumber}</p>
            <p><strong>Course:</strong> ${student.course}</p>
            <p><strong>Year of Study:</strong> ${student.yearOfStudy}</p>
            <button class="update-button" onclick="redirectToUpdate('${student.id}')">Update</button>
        `;

        studentList.appendChild(studentDiv);
    });
}

// Function to redirect to the update page with the student ID in the query string
function redirectToUpdate(studentId) {
    // Navigate to updateStudent.html and pass the student ID as a query parameter
    window.location.href = `updateStudent.html?id=${studentId}`;
}

// Fetch and display students when the page loads
window.onload = fetchStudents;
