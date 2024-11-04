const fs = require('fs').promises; // Import the filesystem module
const { Student } = require('../models/addStudentModel.js'); // Import the Student class

const studentsFilePath = 'utils/students.json'; // Path to students JSON file

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) {
        console.error(err);
        throw err;
    }   
}   

async function addStudent(req, res) {
    try {
        // Extract admissionID and other student details from request body
        const {
            admissionID,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            emailAddress,
            phoneNumber,
            course,
            yearOfStudy,
            profilePicture
        } = req.body;

        // Validation checks
        if (!admissionID || !firstName || !lastName || !dateOfBirth || !gender || !emailAddress || !phoneNumber || !course || !yearOfStudy) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (phoneNumber.length < 8 || phoneNumber.length > 15 || !/^\d+$/.test(phoneNumber)) {
            return res.status(400).json({ message: 'Phone number must be between 8 and 15 digits and contain only numbers.' });
        }

        if (!['Male', 'Female', 'Other'].includes(gender)) {
            return res.status(400).json({ message: 'Invalid gender value.' });
        }

        if (!['1st', '2nd', '3rd'].includes(yearOfStudy)) {
            return res.status(400).json({ message: 'Invalid year of study. It should be one of: 1st, 2nd, 3rd.' });
        }

        // Read existing students from the JSON file
        const allStudents = await readJSON(studentsFilePath);


        // Create a new Student instance
        const newStudent = new Student(
            admissionID,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            emailAddress,
            phoneNumber,
            course,
            yearOfStudy,
            profilePicture
        );

        // Add the new student to the JSON data
        allStudents.push(newStudent);

        // Write updated data to the JSON file
        await writeJSON(allStudents, studentsFilePath);

        // Send success response
        return res.status(201).json({ message: 'Student added successfully!', student: newStudent });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON,
    writeJSON,
    addStudent
};
