class Student {
    constructor(studentID, admissionID, firstName, lastName, dateOfBirth, gender, emailAddress, phoneNumber, course, yearOfStudy, profilePicture) {
        this.studentID = studentID;
        this.admissionID = admissionID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.course = course;
        this.yearOfStudy = yearOfStudy;
        this.profilePicture = profilePicture;

        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000); // Random number between 0 and 999
        this.id = timestamp + "" + random.toString().padStart(3, '0'); // Create a unique ID for each student
    }
}

module.exports = { Student };
