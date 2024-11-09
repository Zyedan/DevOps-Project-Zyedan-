function addCourse() {
	var response = '';

	var jsonData = new Object();
	jsonData.name = document.getElementById('name').value;
	jsonData.course_code = document.getElementById('course_code').value;
	jsonData.description = document.getElementById('description').value;
	var moduleInputs = document.getElementsByName('modules[]');
    jsonData.modules = [];
    for (var i = 0; i < moduleInputs.length; i++) {
        if (moduleInputs[i].value !== '') { // Ensure non-empty values are added
            jsonData.modules.push(moduleInputs[i].value);
        }
    }
	jsonData.course_department = document.getElementById('course_department').value;
	jsonData.course_fee = document.getElementById('course_fee').value;
	jsonData.course_intake = document.getElementById('course_intake').value;

	if (jsonData.name == '' || jsonData.course_code == '' || jsonData.description == '' || jsonData.modules == '' || jsonData.course_department == '' || jsonData.course_fee == '' || jsonData.course_intake == '') {
		document.getElementById('message').innerHTML = 'Please fill in all fields';
		document.getElementById('message').setAttribute('class', 'text-danger');
		return;
	}

	var request = new XMLHttpRequest();

	request.open('POST', '/add-course', true);
	request.setRequestHeader('Content-Type', 'application/json');

	request.onload = function () {
		response = JSON.parse(request.responseText);
		console.log(response)
		if (response.message == undefined) {
			document.getElementById('message').innerHTML = 'Course added successfully';
			document.getElementById('message').setAttribute('class', 'text-success');

			document.getElementById('name').value = '';
			document.getElementById('course_code').value = '';
			document.getElementById('description').value = '';
			document.getElementById('modules').value = '';
			document.getElementById('course_department').value = '';
			document.getElementById('course_fee').value = '';
			document.getElementById('course_intake').value = '';
			window.location.href = 'index.html';
		}
		else {
			document.getElementById('message').innerHTML = response.message;
			document.getElementById('message').setAttribute('class', 'text-danger');
		}
	};
	request.send(JSON.stringify(jsonData));

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