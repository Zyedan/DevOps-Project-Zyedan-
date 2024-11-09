var express = require('express');
var bodyParser = require("body-parser");

const { addStudent } = require('./utils/addStudentUtil');
const { updateStudent, readAllStudents, getStudentById } = require('./utils/updateStudent');

const studentsFilePath = 'C:\\Users\\offic\\Dvops project\\DevOps-Project\\utils\\students.json';

var app = express();

const PORT = process.env.PORT || 5050;

var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

app.get('/students', readAllStudents);

// Endpoint to get a single student by ID
app.get('/students/:id', getStudentById);

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Server started at: ${baseUrl}`);
});

module.exports = { app, server }