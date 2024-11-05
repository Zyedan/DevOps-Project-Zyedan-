const fs = require('fs').promises; // Import the filesystem module
const { Student } = require('../models/updateStudentModel.js'); // Import the Student class

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
        await fs.writeFile(filename, JSON.stringify(object), 'utf8');
        return object;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function updateStudent(req, res) {
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
        if (!admissionID) {
            return res.status(400).json({ message: 'admissionID is required for updating student information.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailAddress && !emailRegex.test(emailAddress)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (phoneNumber && (phoneNumber.length < 8 || phoneNumber.length > 15 || !/^\d+$/.test(phoneNumber))) {
            return res.status(400).json({ message: 'Phone number must be between 8 and 15 digits and contain only numbers.' });
        }

        if (gender && !['Male', 'Female', 'Other'].includes(gender)) {
            return res.status(400).json({ message: 'Invalid gender value.' });
        }

        if (yearOfStudy && !['1st', '2nd', '3rd'].includes(yearOfStudy)) {
            return res.status(400).json({ message: 'Invalid year of study. It should be one of: 1st, 2nd, 3rd.' });
        }

        // Read existing students from the JSON file
        const allStudents = await readJSON(studentsFilePath);

        // Find the student with the given admissionID
        const studentIndex = allStudents.findIndex(student => student.admissionID === admissionID);

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Update student details
        const updatedStudent = {
            ...allStudents[studentIndex],
            firstName: firstName || allStudents[studentIndex].firstName,
            lastName: lastName || allStudents[studentIndex].lastName,
            dateOfBirth: dateOfBirth || allStudents[studentIndex].dateOfBirth,
            gender: gender || allStudents[studentIndex].gender,
            emailAddress: emailAddress || allStudents[studentIndex].emailAddress,
            phoneNumber: phoneNumber || allStudents[studentIndex].phoneNumber,
            course: course || allStudents[studentIndex].course,
            yearOfStudy: yearOfStudy || allStudents[studentIndex].yearOfStudy,
            profilePicture: profilePicture || allStudents[studentIndex].profilePicture
        };

        // Replace the old student data with the updated data
        allStudents[studentIndex] = updatedStudent;

        // Write updated data to the JSON file
        await writeJSON(allStudents, studentsFilePath);

        // Send success response
        return res.status(200).json({ message: 'Student updated successfully!', student: updatedStudent });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON,
    writeJSON,
    updateStudent
};
