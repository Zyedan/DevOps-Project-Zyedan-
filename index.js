var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050;

var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

const { addCourse } = require('./utils/CourseUtil.js');
app.post('/add-course', addCourse);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Server started at: ${baseUrl}`);
});

module.exports = { app, server }