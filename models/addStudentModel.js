class Student {
    constructor(studentID, firstName, lastName, dateOfBirth, gender, emailAddress, phoneNumber, course, yearOfStudy, profilePicture){
        this.studentID = studentID;
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
        const random = math.floor(Math.random()*1000); //random number between 0 and 999 inclusive for the id
        this.id= timestamp + "" + random.toString().padStart(3, '0'); // create a unique id for each student
    }
}

module.exports = {student};