var express = require('express');
var bodyParser = require("body-parser");
const { addStudent } = require('./utils/addStudentUtil');
const { updateStudent, readAllStudents, getStudentById } = require('./utils/updateStudentUtil');

const studentsFilePath = 'C:\\Users\\offic\\Dvops project\\DevOps-Project\\utils\\students.json';
//For DevOps demo
const client = require('prom-client');
const register = new client.Registry();

const logger = require('./logger');
var app = express();
const PORT = process.env.PORT || 5050;
var startPage = "course.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const statusMonitor = require('express-status-monitor')();
app.use(statusMonitor);

//Create default prometheus metrics
client.collectDefaultMetrics({ register });

// Custom metric: http_requests_total
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
register.registerMetric(httpRequestCounter);

// Custom metric: course_operations_total
const courseOperationsCounter = new client.Counter({
    name: 'course_operations_total',
    help: 'Total number of course operations',
    labelNames: ['operation', 'status']
});
register.registerMetric(courseOperationsCounter);

// Custom metric: course_operation_duration_seconds
const courseOperationDuration = new client.Histogram({
    name: 'course_operation_duration_seconds',
    help: 'Duration of course operations in seconds',
    labelNames: ['operation']
});
register.registerMetric(courseOperationDuration);

// Middleware to count requests
app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
    });
    next();
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

const { editCourse, viewCourses } = require('./utils/updateCourseUtil');

// Modified edit course endpoint with metrics
app.put('/edit-course/:id', async (req, res) => {
    const end = courseOperationDuration.startTimer({ operation: 'edit' });
    try {
        await editCourse(req, res);
        courseOperationsCounter.inc({ operation: 'edit', status: 'success' });
    } catch (error) {
        courseOperationsCounter.inc({ operation: 'edit', status: 'error' });
        throw error;
    } finally {
        end();
    }
});

// Modified view courses endpoint with metrics
app.get('/view-courses', async (req, res) => {
    const end = courseOperationDuration.startTimer({ operation: 'view' });
    try {
        await viewCourses(req, res);
        courseOperationsCounter.inc({ operation: 'view', status: 'success' });
    } catch (error) {
        courseOperationsCounter.inc({ operation: 'view', status: 'error' });
        throw error;
    } finally {
        end();
    }
});
/*
// Custom metric: http_requests_total
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
register.registerMetric(httpRequestCounter);

// Middleware to count requests
app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
    });
    next();
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});



const { editCourse, viewCourses } = require('./utils/updateCourseUtil');
app.put('/edit-course/:id', editCourse);
app.get('/view-courses', viewCourses);
*/

const { addCourse } = require('./utils/addCourseUtil');
app.post('/add-course', addCourse);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

app.post('/add-student', addStudent);

app.get('/students', readAllStudents);

app.put('/students/:id', updateStudent);

// Endpoint to get a single student by ID
app.get('/students/:id', getStudentById);

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Server started at: ${baseUrl}`);
    logger.info(`Demo Project at: ${baseUrl}`);
    logger.error(`Error at: ${baseUrl}`);
    console.log(`Metrics are available at: ${baseUrl}/metrics`);
});

module.exports = { app, server }