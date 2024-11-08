//Utils for courses
const { read } = require('fs');
const { Course } = require('../models/Course');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(err); throw err;
    }
}
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);

        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}
// Function to update the course variables such as name, description etc.

async function editCourse(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const course_code = req.body.course_code;
        const description = req.body.description;
        const modules = req.body.modules;
        const course_department = req.body.course_department;
        const course_fee = req.body.course_fee;
        const requirements = req.body.requirements;
        const course_intake = req.body.course_intake;

        const allCourses = await readJSON('utils/courses.json');

        var modified = false;

        for (var i = 0; i < allCourses.length; i++) {
            if (allCourses[i].id == id) {
                allCourses[i].name = name;
                allCourses[i].course_code = course_code;
                allCourses[i].description = description;
                allCourses[i].modules = modules;
                allCourses[i].course_department = course_department;
                allCourses[i].course_fee = course_fee;
                allCourses[i].requirements = requirements;
                allCourses[i].course_intake = course_intake;
                modified = true;
                break;
            }
        }

        if (modified) {
            await fs.writeFile('utils/courses.json', JSON.stringify(allCourses), 'utf8');
            return res.status(201).json({ message: 'Course updated successfully' });
        } else {
            return res.status(500).json({ message: 'Course not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function viewCourses(req, res) {
    try{
        const allCourses = await readJSON('utils/courses.json');
        return res.status(201).json(allCourses);
    }catch (error){
        return res.status(500).json({ message: error.message });
    }
}
module.exports = { readJSON, writeJSON, editCourse, viewCourses };