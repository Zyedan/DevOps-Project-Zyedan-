class Course {
    constructor(name, course_code, description, modules, course_department, course_fee, requirements, course_intake) {
        this.name = name;
        this.course_code = course_code;
        this.description = description;
        this.modules = modules;
        this.course_department = course_department;
        this.course_fee = course_fee;
        this.requirements = requirements;
        this.course_intake = course_intake;

        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, "0");
    }
}

module.exports = { Course };