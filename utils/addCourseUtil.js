//Utils for courses

// Importing required modules
const { read } = require('fs');
const { Course } = require('../models/Course');
const fs = require('fs').promises;

// Function to read JSON file
async function readJSON(filename) {
	try {
		const data = await fs.readFile(filename, 'utf8');
		return JSON.parse(data);
	} catch (err) {
		console.error(err); throw err;
	}
}

// function to write JSON file
async function writeJSON(object, filename) {
	try {
		const allObjects = await readJSON(filename);
		allObjects.push(object);

		await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
		return allObjects;
	} catch (err) { console.error(err); throw err; }
}

// Function to add a course
async function addCourse(req, res) {
    try {
        const name = req.body.name; // Get the course details from the request body
        const course_code = req.body.course_code;
        const description = req.body.description;
        let modules = req.body.modules;
        if (!Array.isArray(modules)) {
            modules = [modules]; 
        }
        const course_department = req.body.course_department;
        const course_fee = req.body.course_fee;
        const requirements = req.body.requirements;
        const course_intake = req.body.course_intake;

		// Validate the course details
        if (!/^\d+(\.\d+)?$/.test(course_fee) || !/^\d+$/.test(course_intake)) {
            return res.status(400).json({ message: 'Validation error' });
        } else { // Create a new course object
            const newCourse = new Course(name, course_code, description, modules, course_department, course_fee, requirements, course_intake);
            const updatedCourses = await writeJSON(newCourse, 'utils/courses.json');
            return res.status(201).json(updatedCourses);
        } // Return the updated courses
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { readJSON, writeJSON, addCourse };
