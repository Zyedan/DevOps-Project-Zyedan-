/*
function editCourse(data) {
    var selectedCourse = JSON.parse(data);

    document.getElementById('name').value = selectedCourse.name;
    document.getElementById('course_code').value = selectedCourse.course_code;
    document.getElementById('description').value = selectedCourse.description;
    document.getElementById('modules').value = selectedCourse.modules;
    document.getElementById('course_department').value = selectedCourse.course_department;
    document.getElementById('course_fee').value = selectedCourse.course_fee;
    document.getElementById('requirements').value = selectedCourse.requirements;
    document.getElementById('course_intake').value = selectedCourse.course_intake;
    document.getElementById('id').value = selectedCourse.id;
    openModal();
}
//Function to open the modal
function openModal(id) {
    document.getElementById('id').value = id;

    document.getElementById('updateModal').style.display = 'block';
}
//Function to close the modal
function closeModal() {
    document.getElementById('updateModal').style.display = 'none';
}

//Function to handle form submission
function submitUpdate(event) {
    //Prevent default form submission
    event.preventDefault();

    //Gather form data
    const updatedCourseData = {
        
        name: document.getElementById('name').value,
        course_code: document.getElementById('course_code').value,
        description: document.getElementById('description').value,
        modules: document.getElementById('modules').value,
        course_department: document.getElementById('course_department').value,
        course_fee: document.getElementById('course_fee').value,
        requirements: document.getElementById('requirements').value,
        course_intake: document.getElementById('course_intake').value
    };

    //Make an API call to update the course on the backend
    let request = new XMLHttpRequest();
    request.open('PUT', `/edit-course/${document.getElementById('id').value}`, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        if (request.status == 200) {
            alert('Course updated successfully');
        } else {
            console.log(request.responseText);
        }
    }
    //Send the updated course data
    request.send(JSON.stringify(updatedCourseData));

    //Close the modal
    closeModal();
}
*/
function viewCourses() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-courses', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        var html = ''
        for (var i = 0; i < response.length; i++) {
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + response[i].name + '</td>' +
                '<td>' + response[i].course_code + '</td>' +
                '<td>' + response[i].description + '</td>' +
                '<td>' + response[i].modules + '</td>' +
                '<td>' + response[i].course_department + '</td>' +
                '<td>' + response[i].course_fee + '</td>' +
                '<td>' + response[i].requirements + '</td>' +
                '<td>' + response[i].course_intake + '</td>' +
                '<td>' + '<button onclick="editCourse(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;')+ '\')">Edit</button>' + '</td>' +
                '</tr>';
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}
//Function to open the modal
function openModal() {
    console.log("Model activated")
    console.log(id)
    document.getElementById('updateModal').style.display = 'block';
}
//Function to close the modal
function closeModal() {
    document.getElementById('updateModal').style.display = 'none';
}
function editCourse(data) {
    var selectedCourse = JSON.parse(data);

    document.getElementById('id').value = selectedCourse.id;
    document.getElementById('name').value = selectedCourse.name;
    document.getElementById('course_code').value = selectedCourse.course_code;
    document.getElementById('description').value = selectedCourse.description;
    document.getElementById('modules').value = selectedCourse.modules;
    document.getElementById('course_department').value = selectedCourse.course_department;
    document.getElementById('course_fee').value = selectedCourse.course_fee;
    document.getElementById('requirements').value = selectedCourse.requirements;
    document.getElementById('course_intake').value = selectedCourse.course_intake;

    document.getElementById('updateButton').setAttribute('onclick', 'updateCourse("' + selectedCourse.id + '")');

    openModal(selectedCourse.id);
}

function updateCourse(id) {
    console.log(id)
    var response = "";

    var jsonData = new Object();
    jsonData.name = document.getElementById('name').value;
    jsonData.course_code = document.getElementById('course_code').value;
    jsonData.description = document.getElementById('description').value;
    jsonData.modules = document.getElementById('modules').value;
    jsonData.course_department = document.getElementById('course_department').value;
    jsonData.course_fee = document.getElementById('course_fee').value;
    jsonData.requirements = document.getElementById('requirements').value;
    jsonData.course_intake = document.getElementById('course_intake').value;

    if (jsonData.name == "" || jsonData.course_code == "" || jsonData.description == "" || jsonData.modules == "" || jsonData.course_department == "" || jsonData.course_fee == "" || jsonData.requirements == "" || jsonData.course_intake == "") {
        alert('Please fill all fields');
        return;
    }

    var request = new XMLHttpRequest();
    request.open('PUT', '/edit-course/' + id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == 'Course updated successfully') {
            alert('Course updated successfully');
        } else {
            alert('Course not found');
            alert(response.message);
        }
    };
    request.send(JSON.stringify(jsonData));
}