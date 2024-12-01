const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const sinon = require('sinon'); //Import sinon for mocking the fs module
const fs = require('fs').promises;//File system module for mocking
const { writeJSON } = require('../utils/updateCourseUtil');//Adjust path as neccessary to locate the utils file

describe('Resource API', () => {
    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address == '::' ? 'localhost' : address}:${port}`;
    });
    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });
    let baseUrl
    let courseId = 1731246129400553;

    //Test suite for viewing courses
    describe('Get view-courses', () => {
        it('should return 201 status code', (done) => {
            chai.request(baseUrl).get(`/view-courses`).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(201);
                done();
            });
        });
    });

    //Test suite for editing courses
    describe('Put for /edit-course', () => {
        it('should update an existing resource', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(201);
                done();
            });
        });
        it('should return 400 status code if course name is less than 3 characters', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'SE',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course name includes special characters', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'SE101$',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course code is less than 3 characters', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course code includes special characters', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101$',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course description is less than 10 characters', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course department is less than 3 characters', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'CS',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if modules are less than 1', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: [],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course fee is less than 1000', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 500,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course fee is greater than 100000', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 1000000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course intake is less than 1', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 0
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if course intake is greater than 1000', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software Deployments'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 1001
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
        it('should return a 400 status code if modules are greater than 10', (done) => {
            chai.request(baseUrl).put(`/edit-course/${courseId}`).send({
                name: 'Software Engineerings',
                course_code: 'SE101s',
                description: 'Software Engineering is a field that deals with the development of software applicationss.',
                modules: ['Software Development', 'Software Testing', 'Software Maintenance', 'Software', 'Software', 'Software', 'Software', 'Software', 'Software', 'Software', 'Software'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 750
            }).end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                done();
            });
        });
    });

    //Test suite for writeJSON function
    describe('writeJSON function', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('should write a JSON file and return the updated object', async () => {
            //Mock the readFile and writeFile
            sinon.stub(fs, 'readFile').resolves(JSON.stringify([{ name: 'Computer Sciences', course_code: 'CS101', description: 'Computer Sciences is a field that deals with the study of computers and computational systems.', modules: ['Computer Programming', 'Data Structures', 'Algorithms', 'Computer Networks'], course_department: 'Computer Sciences', course_fee: 10000, requirements: ['Programming Knowledges', 'Problem Solving Skills'], course_intake: 500 }]));
            sinon.stub(fs, 'writeFile').resolves();

            const newObject = {
                name: 'Computer Sciences',
                course_code: 'CS101',
                description: 'Computer Sciences is a field that deals with the study of computers and computational systems.',
                modules: ['Computer Programming', 'Data Structures', 'Algorithms', 'Computer Networks'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 500
            };
            const testFile = 'courses.json';

            const result = await writeJSON(newObject, testFile);

            expect(result).to.be.an('array');
            expect(result).to.deep.include(newObject);
            expect(fs.writeFile.calledOnce).to.be.true;
        });

        it('should throw an error if the file does not exist', async () => {
            sinon.stub(fs, 'readFile').rejects({ code: 'ENOENT', message: 'File not found' });
            const newObject = {
                name: 'Computer Sciences',
                course_code: 'CS1010',
                description: 'Computer Sciences is a field that deals with the study of computers and computational systems.',
                modules: ['Computer Programming', 'Data Structures', 'Algorithms', 'Computer Networks'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 500
            };
            const testFile = 'courses.json';

            try {
                await writeJSON(newObject, testFile);
            } catch (err) {
                expect(err.message).to.equal('File not found');
            }
        });

        it('should throw an error if the file contains invalid JSON', async () => {
            sinon.stub(fs, 'readFile').resolves('Invalid JSON');

            const newObject = {
                name: 'Computer Sciences',
                course_code: 'CS1010',
                description: 'Computer Sciences is a field that deals with the study of computers and computational systems.',
                modules: ['Computer Programming', 'Data Structures', 'Algorithms', 'Computer Networks'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 500
            };
            const testFile = 'courses.json';

            try {
                await writeJSON(newObject, testFile);
            } catch (err) {
                expect(err).to.be.instanceOf(SyntaxError);
                expect(err.message).to.include('Invalid JSON');
            }
        });

        it('should throw an error if the writing to the file fails', async () => {
            sinon.stub(fs, 'readFile').resolves(JSON.stringify([]));
            sinon.stub(fs, 'writeFile').rejects(new Error('Write failed'));

            const newObject = {
                name: 'Computer Sciences',
                course_code: 'CS1010',
                description: 'Computer Sciences is a field that deals with the study of computers and computational systems.',
                modules: ['Computer Programming', 'Data Structures', 'Algorithms', 'Computer Networks'],
                course_department: 'Computer Sciences',
                course_fee: 10000,
                requirements: ['Programming Knowledges', 'Problem Solving Skills'],
                course_intake: 500
            };
            const testFile = 'courses.json';

            try {
                await writeJSON(newObject, testFile);
            } catch (err) {
                expect(err.message).to.equal('Write failed');
            }
        });
    });
});