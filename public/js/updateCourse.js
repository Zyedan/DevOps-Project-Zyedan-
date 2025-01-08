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
                '<td>' + '<button type="button" class="btn btn-warning" onclick="editCourse(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit</button> ' +
                '</td>' +
                '</tr>';
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}

function editCourse(data) {
    console.log("Editing course:", data);
    var selectedCourse = JSON.parse(data);

    document.getElementById('editName').value = selectedCourse.name;
    document.getElementById('editCourse_code').value = selectedCourse.course_code;
    document.getElementById('editDescription').value = selectedCourse.description;
    document.getElementById('editModules').value = selectedCourse.modules;
    document.getElementById('editCourse_department').value = selectedCourse.course_department;
    document.getElementById('editCourse_fee').value = selectedCourse.course_fee;
    document.getElementById('editRequirements').value = selectedCourse.requirements;
    document.getElementById('editCourse_intake').value = selectedCourse.course_intake;

    document.getElementById('updateButton').setAttribute('onclick', 'updateCourse("' + selectedCourse.id + '")');

    $('#editCourseModal').modal('show');
}

function updateCourse(id) {
    console.log(id)
    var response = "";

    var jsonData = new Object();
    jsonData.name = document.getElementById('editName').value;
    jsonData.course_code = document.getElementById('editCourse_code').value;
    jsonData.description = document.getElementById('editDescription').value;
    var moduleInputs = document.getElementsByName('editModules[]');

    //modules is an array
    jsonData.modules = []; //add the modules inputted from frontend into the array
    for (var i = 0; i < moduleInputs.length; i++) {
        if (moduleInputs[i].value !== '') { // Ensure non-empty values are added
            jsonData.modules.push(moduleInputs[i].value);
        }
    }
    jsonData.course_department = document.getElementById('editCourse_department').value;
    jsonData.course_fee = document.getElementById('editCourse_fee').value;
    jsonData.requirements = document.getElementById('editRequirements').value;
    jsonData.course_intake = document.getElementById('editCourse_intake').value;

    if (jsonData.name == "" || jsonData.course_code == "" || jsonData.description == "" || jsonData.modules == "" || jsonData.course_department == "" || jsonData.course_fee == "" || jsonData.requirements == "" || jsonData.course_intake == "") {
        alert('Please fill all fields');
        return;
    }
    if (jsonData.name.length < 3 || jsonData.name.length > 50) {
        alert('Course name must be between 3 and 50 characters');
        return;
    }
    if (!/^[A-Za-z0-9\s]+$/.test(jsonData.name)) {
        alert('Course name can only contain letters, numbers and spaces');
        return;
    }
    if (jsonData.course_code.length < 3 || jsonData.course_code.length > 10) {
        alert('Course code must be between 3 and 10 characters');
        return;
    }
    if (!/^[A-Za-z0-9]+$/.test(jsonData.course_code)) {
        alert('Course code can only contain letters and numbers');
        return;
    }
    if (jsonData.description.length < 10 || jsonData.description.length > 200) {
        alert('Course description must be between 10 and 200 characters');
        return;
    }
    if (jsonData.modules.length < 2 || jsonData.modules.length > 10) {
        alert('Course modules must be between 2 and 10');
        return;
    }
    if (jsonData.course_fee < 1000 || jsonData.course_fee > 100000) {
        alert('Course fee must be between 1000 and 100000');
        return;
    }
    if (jsonData.course_intake < 1 || jsonData.course_intake > 1000) {
        alert('Course intake must be between 1 and 1000');
        return;
    }

    var request = new XMLHttpRequest();
    request.open('PUT', '/edit-course/' + id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == 'Course updated successfully') {
            document.getElementById('editMessage').innerHTML = 'Updated Course: ' + jsonData.name + '!';
            document.getElementById('editMessage').setAttribute('class', 'text-success');
            window.location.href = 'course.html';
        } else {
            document.getElementById('editMessage').innerHTML = 'Unable to update course: ' + response.message;
            document.getElementById('editMessage').setAttribute('class', 'text-danger');
        }
    };
    request.send(JSON.stringify(jsonData));
}