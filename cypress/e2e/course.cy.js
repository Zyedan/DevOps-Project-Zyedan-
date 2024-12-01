describe('Update Course Frontend', () => {
  let baseUrl;
  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });
  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });
  it('should view courses', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
  });
  it('should edit course', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(3).type('Computer Science', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(4).type('Mathematics', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT', { force: true });
    cy.get('#editCourse_fee').clear().type('5000');
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200');
    cy.get('button').contains('Update Course').click();
  });
  it('should not update course - empty fields', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editCourseModal').should('be.visible'); // Wait for modal to become visible
    cy.get('#editName').clear({force: true});
    cy.get('#editCourse_code').clear({force: true});
    cy.get('#editDescription').clear({force: true});
    cy.get('#editModules').clear({force: true});
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear({force: true});
    cy.get('#editRequirements').clear({force: true});
    cy.get('#editCourse_intake').clear({force: true});
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please fill all fields');
    });
    cy.get('button').contains('Update Course').click({force: true});
  });
  
  it('should not update course - course name too short', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('SE', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course name must be between 3 and 50 characters');
    });
    cy.get('button').contains('Update Course').click();
  });
  
  it('should not update course - course name too long', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course name must be between 3 and 50 characters');
    });
    cy.get('button').contains('Update Course').click();
  });
  
  it('should not update course - course name invalid characters', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('SE101#', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course name can only contain letters, numbers and spaces');
    });
    cy.get('button').contains('Update Course').click();
  });
  
  it('should not update course - course code too short', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course code must be between 3 and 10 characters');
    });
    cy.get('button').contains('Update Course').click();
  });

  it('should not update course - course code too long', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SSSSSSSSSSSSSS', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course code must be between 3 and 10 characters');
    });
    cy.get('button').contains('Update Course').click();
  });

  it('should not update course - course code invalid characters', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101#', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course code can only contain letters and numbers');
    });
    cy.get('button').contains('Update Course').click();
  });

  it('should not update course - course description too short', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course description must be between 10 and 200 characters');
    });
    cy.get('button').contains('Update Course').click();
  });
  it('should not update course - course description too long', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('The quick brown fox jumps over the lazy dog while carrying a small, shiny key. It seems to be on an important mission, navigating through the dense forest and avoiding obstacles with incredible agility.', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course description must be between 10 and 200 characters');
    });
    cy.get('button').contains('Update Course').click();
  });
  it('should not update course - course modules too short', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Computer Science', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course modules must be between 2 and 10');
    });
    cy.get('button').contains('Update Course').click();
  });
  it('should not update course - course modules too many', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(3).type('Computer Science', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(4).type('Mathematics', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(5).type('Physics', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(6).type('Chemistry', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(7).type('Biology', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(8).type('Geography', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(9).type('History', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(10).type('English', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course modules must be between 2 and 10');
    });
    cy.get('button').contains('Update Course').click();
  });
  it('should not update course - course fee too low', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(3).type('Computer Science', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('999', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course fee must be between 1000 and 100000');
    });
    cy.get('button').contains('Update Course').click();
  });
  it('should not update course - course fee too high', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(3).type('Computer Science', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('100001', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('200', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course fee must be between 1000 and 100000');
    });
    cy.get('button').contains('Update Course').click();
  });
  it('should not update course - course intake too low', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(3).type('Computer Science', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('0', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course intake must be between 1 and 1000');
    });
    cy.get('button').contains('Update Course').click();
  });
  it('should not update course - course intake too high', () => {
    cy.visit(baseUrl);
    cy.get('a[href="course.html"]').click();
    cy.get('button').contains('Edit').click();
    cy.get('#editName').clear().type('Software Engineering', { force: true });
    cy.get('#editCourse_code').clear().type('SE101', { force: true });
    cy.get('#editDescription').clear().type('Learn software engineering', { force: true });
    cy.get('#editModules').clear().type('Software Development', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(2).type('Software Design', { force: true });
    cy.get('button[class="btn btn-outline-secondary"]').eq(1).contains('Add Module').click();
    cy.get('input[class="form-control mb-2"]').eq(3).type('Computer Science', { force: true });
    cy.get('#editCourse_department').select('School of Informatics & IT',{force: true});
    cy.get('#editCourse_fee').clear().type('2000', {force: true});
    cy.get('#editRequirements').clear().type('Programming Knowledges, Problem Solving Skills', { force: true });
    cy.get('#editCourse_intake').clear().type('1001', { force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Course intake must be between 1 and 1000');
    });
    cy.get('button').contains('Update Course').click();
  });
});