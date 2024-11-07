var express = require('express');
var bodyParser = require("body-parser");
const { addStudent } = require('./utils/addStudentUtil');
var app = express();

app.use(cors());

const PORT = process.env.PORT || 5050;

var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));
app.use(express.json());    



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

app.post('/add-student', addStudent);


server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Server started at: ${baseUrl}`);
});

module.exports = { app, server }