function addCourse() {
	var response = '';

	var jsonData = new Object();
	jsonData.name = document.getElementById('name').value;
	jsonData.course_code = document.getElementById('course_code').value;
	jsonData.description = document.getElementById('description').value;
	jsonData.modules = document.getElementById('modules').value;
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
}