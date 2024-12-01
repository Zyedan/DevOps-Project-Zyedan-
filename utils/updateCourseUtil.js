//Utils for courses
const { read } = require('fs');
const { Course } = require('../models/Course');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err instanceof SyntaxError) {
            //Re-throw a SyntaxError with a custom message
            throw new SyntaxError('Invalid JSON: The file contains malformed JSON');
        }
        console.error(err);
        throw err;
    }
}
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        if (!Array.isArray(allObjects)) {
            throw new Error('Invalid JSON format: Expected an array');
        }
        allObjects.push(object);

        await fs.writeFile(filename, JSON.stringify(allObjects, null, 2), 'utf8');
        return allObjects;
    } catch (err) {
        if (err.code === 'ENOENT' || err.message.includes('File does not exist')) {
            throw new Error('File not found');
        }
        //If we hit an invalid JSON error from readJSON, rethrow a specific SyntaxError
        if (err instanceof SyntaxError) {
            throw new SyntaxError('Invalid JSON format: The file contains malformed JSON');
        }
        if (err.message.includes('Invalid JSON format')) {
            throw err;
        }
        console.error(err);
        throw new Error('Write failed');
    }
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

        //Course name validation
        if (!name || name.trim() === '' || name.length < 3 || name.length > 50) {
            return res.status(400).json({ message: 'Course name is required and be between 3 to 50 characters' });
        }
        if (!/^[A-Za-z0-9\s]+$/.test(name)) {
            return res.status(400).json({ message: 'Course name can only contain letters, numbers and spaces' });
        }
        //Course code validation
        if (!course_code || course_code.trim() === '' || course_code.length < 3 || course_code.length > 10) {
            return res.status(400).json({ message: 'Course code is required and be between 3 to 10 characters' });
        }
        if (!/^[A-Za-z0-9]+$/.test(course_code)) {
            return res.status(400).json({ message: 'Course code can only contain letters and numbers' });
        }
        //Course description validation
        if (!description || description.trim() === '' || description.length < 10 || description.length > 200) {
            return res.status(400).json({ message: 'Course description is required and be between 10 to 200 characters' });
        }
        //Course modules validation
        if (!modules || modules.length < 1 || modules.length > 10) {
            return res.status(400).json({ message: 'Course modules are required and must be between 1 to 10' });
        }
        //Course department validation
        if (!course_department || course_department.trim() === '' || course_department.length < 3 || course_department.length > 50) {
            return res.status(400).json({ message: 'Course department is required and be between 3 to 50 characters' });
        }
        if (!/^[A-Za-z0-9\s]+$/.test(course_department)) {
            return res.status(400).json({ message: 'Course department can only contain letters, numbers and spaces' });
        }
        //Course fee validation
        if (!course_fee || course_fee < 1000 || course_fee > 100000) {
            return res.status(400).json({ message: 'Course fee is required and must be between 1000 to 100000' });
        }
        //Course requirements validation
        if (!requirements || requirements.length < 1 || requirements.length > 10) {
            return res.status(400).json({ message: 'Course requirements are required and must be between 1 to 10' });
        }
        //Course intake validation
        if (!course_intake || course_intake < 1 || course_intake > 1000) {
            return res.status(400).json({ message: 'Course intake is required and must be between 1 to 1000' });
        }
        //Read all courses
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
        const nameRegex = /^[A-Za-z0-9\s]+$/; //Letters numbers and spaces
        const courseCodeRegex = /^[A-Za-z0-9]+$/; //Letters and numbers only
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
    try {
        const allCourses = await readJSON('utils/courses.json');
        return res.status(201).json(allCourses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = { readJSON, writeJSON, editCourse, viewCourses };