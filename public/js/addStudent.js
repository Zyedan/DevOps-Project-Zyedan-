// Function to show the modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Function to close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function addStudent() {
    var response = {};

    var jsonData = new Object();
    jsonData.admissionID = document.getElementById("admissionID").value;
    jsonData.firstName = document.getElementById("firstName").value;
    jsonData.lastName = document.getElementById("lastName").value;
    jsonData.dateOfBirth = document.getElementById("dateOfBirth").value;
    jsonData.gender = document.getElementById("gender").value;
    jsonData.emailAddress = document.getElementById("emailAddress").value;
    jsonData.phoneNumber = document.getElementById("phoneNumber").value;
    jsonData.course = document.getElementById("course").value;
    jsonData.yearOfStudy = document.getElementById("yearOfStudy").value;
    jsonData.profilePicture = document.getElementById("profilePicture").value;

    let errorMessage = "";

    if (jsonData.admissionID === "" || jsonData.firstName === "" || jsonData.lastName === "" || jsonData.dateOfBirth === "" || jsonData.gender === "" || jsonData.emailAddress === "" || jsonData.phoneNumber === "" || jsonData.course === "" || jsonData.yearOfStudy === "") {
        errorMessage = "All fields are required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(jsonData.emailAddress)) {
        errorMessage = "Invalid email format.";
    } else if (jsonData.phoneNumber.length < 8 || jsonData.phoneNumber.length > 15 || !/^\d+$/.test(jsonData.phoneNumber)) {
        errorMessage = "Phone number must be between 8 and 15 digits and contain only numbers.";
    } else if (isNaN(jsonData.yearOfStudy) || jsonData.yearOfStudy < 1 || jsonData.yearOfStudy > 3) {
        errorMessage = "Year of study must be a valid number between 1 and 3.";
    } else if (jsonData.firstName == jsonData.lastName) {
        errorMessage = "First name and last name cannot be the same.";
    } else {
        const dateOfBirth = new Date(jsonData.dateOfBirth);
        if (dateOfBirth > new Date()) {
            errorMessage = "Date of birth cannot be in the future.";
        }
    }

    // If there's an error, show it and stop the function
    if (errorMessage) {
        document.getElementById("message").innerHTML = errorMessage;
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();

    request.open("POST", "/add-student", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        response = JSON.parse(request.responseText);    
        console.log(response);
        if (response.message === "Student added successfully!") {
            document.getElementById("message").innerHTML = "Added Student: " + response.student.firstName + " " + response.student.lastName + "!";
            document.getElementById("message").setAttribute("class", "text-success");

            // Clear the form after successful submission
            document.getElementById("admissionID").value = "";
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("dateOfBirth").value = "";
            document.getElementById("gender").value = "";
            document.getElementById("emailAddress").value = "";
            document.getElementById("phoneNumber").value = "";
            document.getElementById("course").value = "";
            document.getElementById("yearOfStudy").value = "";
            document.getElementById("profilePicture").value = "";

            // Close the modal after successful submission
            setTimeout(() => {
                closeModal('addStudentModal');
            }, 3000);
        } else {
            document.getElementById("message").innerHTML = response.message || 'Unable to add student!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}
