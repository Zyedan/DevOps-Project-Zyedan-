// Function to get the student ID from the URL
function getStudentIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch and display student details
async function fetchStudentDetails() {
    const studentId = getStudentIdFromUrl();
    if (!studentId) {
        console.error("No student ID found in the URL.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5050/students/${studentId}`);
        if (!response.ok) throw new Error('Failed to fetch student details');

        const student = await response.json();
        populateForm(student);
    } catch (error) {
        console.error('Error fetching student details:', error);
    }
}

// Populate the form fields with the fetched student data
function populateForm(student) {
    document.getElementById('firstName').value = student.firstName;
    document.getElementById('lastName').value = student.lastName;
    document.getElementById('email').value = student.emailAddress;
    document.getElementById('phone').value = student.phoneNumber;
    document.getElementById('course').value = student.course;
    document.getElementById('yearOfStudy').value = student.yearOfStudy;
    document.getElementById('gender').value = student.gender;
    document.getElementById('dateOfBirth').value = student.dateOfBirth;
}

// Function to submit the form data
async function submitForm(event) {
    if (event) {
        event.preventDefault(); // Prevent the form from reloading the page
    }

    const studentId = getStudentIdFromUrl();
    const updatedData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        emailAddress: document.getElementById('email').value,
        phoneNumber: document.getElementById('phone').value,
        course: document.getElementById('course').value,
        yearOfStudy: document.getElementById('yearOfStudy').value
    };

    try {
        const response = await fetch(`http://localhost:5050/update-student/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update student');
        }

        const result = await response.json();
        alert(result.message); // Show success message
        window.location.href = 'viewStudents.html'; // Redirect to the main page
    } catch (error) {
        console.error('Error updating student:', error);
        alert('Could not update student details. Please try again.');
    }
}

// Fetch student details on page load
window.onload = fetchStudentDetails;
