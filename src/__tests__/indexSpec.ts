import request from 'supertest';
import { app } from '..';
import mongoose from 'mongoose';
import Employee from '../models/employee';
import { authMethods } from '../middlewares/auth';
import Attendance from '../models/attendance';

describe('Login Route', () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL as string;
    await mongoose.connect(mongoUrl, {});
    await Employee.deleteMany({});
    await Employee.create({
      name: 'Test User',
      email: 'hrEmployee@example.com',
      password: authMethods.hashPassword('password'),
      group: 'HR',
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  it('should log in HR employees successfully', async () => {
    const credentials = {
      email: 'hrEmployee@example.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/login')
      .send(credentials)
      .expect(200);

    expect(response.body.token).toBeDefined;
    expect(response.body.employee).toBeDefined;
  });

  it('should not log in non-HR employees', async () => {
    const credentials = {
      email: 'normalEmployee@example.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/login')
      .send(credentials)
      .expect(401);

    expect(response.text).toBe('{"error":"Invalid email or password"}');
  });

  it('should not log in with incorrect email or password', async () => {
    const credentials = {
      email: 'wrong@example.com',
      password: 'wrong',
    };

    const response = await request(app)
      .post('/login')
      .send(credentials)
      .expect(401);

    expect(response.text).toBe('{"error":"Invalid email or password"}');
  });
});

describe('Employee Route', () => {
  let hrToken: string | String;

  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL as string;
    await mongoose.connect(mongoUrl, {});
    await Employee.deleteMany({});
    const hrEmployee = await Employee.create({
      name: 'HR User',
      email: 'hrEmployee1@example.com',
      password: authMethods.hashPassword('password'),
      group: 'HR',
    });

    hrToken = authMethods.generateJWT({ id: hrEmployee.id });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new employee successfully', async () => {
    const newEmployee = {
      name: 'Test User',
      email: 'testEmployee1@example.com',
      password: 'password',
      group: 'Normal Employee',
    };

    const response = await request(app)
      .post('/employees/create')
      .set('Authorization', `${hrToken}`)
      .send(newEmployee)
      .expect(201);

    expect(response.body.name).toBe(newEmployee.name);
    expect(response.body.email).toBe(newEmployee.email);
    expect(response.body.group).toBe(newEmployee.group);
    expect(response.body.password).toBeUndefined();
  });
  it('should update an employee successfully', async () => {
    const updatedEmployee = {
      name: 'Updated User',
      email: 'testEmployee1@example.com',
      password: 'updatedPassword',
      group: 'Normal Employee',
    };

    const employee = await Employee.findOne({ email: updatedEmployee.email });
    const response = await request(app)
      .patch(`/employees/profile/${employee?.id}`)
      .set('Authorization', `${hrToken}`)
      .send(updatedEmployee)
      .expect(200);

    expect(response.body.name).toBe(updatedEmployee.name);
    expect(response.body.email).toBe(updatedEmployee.email);
    expect(response.body.group).toBe(updatedEmployee.group);
    expect(response.body.password).toBeUndefined();
  });
  it('getEmployeeDetails should return the details of a specific employee', async () => {
    const newEmployee = {
      name: 'Another Test User',
      email: 'testEmployee3@example.com',
      password: 'password',
      group: 'Normal Employee',
    };

    const createdEmployee = await Employee.create(newEmployee);
    const response = await request(app)
      .get(`/employees/emp/${createdEmployee.id}`)
      .set('Authorization', `${hrToken}`)
      .expect(200);

    expect(response.body.name).toBe(newEmployee.name);
    expect(response.body.email).toBe(newEmployee.email);
    expect(response.body.group).toBe(newEmployee.group);
    expect(response.body.password).toBeUndefined();
  });
  // Test getAllEmployeesByGroup middleware
  it('getAllEmployeesByGroup should return paginated employees by group', async () => {
    // First, create some additional employees
    for (let i = 12; i < 22; i++) {
      await Employee.create({
        name: `Employee ${i}`,
        email: `employee${i}@example.com`,
        password: 'password',
        group: 'Normal Employee',
      });
    }

    const response = await request(app)
      .get('/employees/all?group=normal&pageNumber=1&pageSize=5')
      .set('Authorization', `${hrToken}`)
      .expect(200);

    expect(response.body.pagination).toBeDefined();
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(5);
    expect(response.body.employees.length).toBe(5);
  });

  it('getAllEmployeesByGroup should return an error for invalid group', async () => {
    const response = await request(app)
      .get('/employees/all?group=invalid&pageNumber=1&pageSize=5')
      .set('Authorization', `${hrToken}`)
      .expect(400);

    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('Invalid group query');
  });
});

describe('Attendance Route', () => {
  let hrToken: string | String;

  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL as string;
    await mongoose.connect(mongoUrl, {});
    await Attendance.deleteMany({});
    const hrEmployee = await Employee.create({
      name: 'HR User',
      email: 'hrEmployee2@example.com',
      password: authMethods.hashPassword('password'),
      group: 'HR',
    });

    hrToken = authMethods.generateJWT({ id: hrEmployee.id });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new attendance record successfully', async () => {
    const NormalEmployee = await Employee.create({
      name: 'Normal User',
      email: 'Employee5@example.com',
      password: authMethods.hashPassword('password'),
      group: 'Normal Employee',
    });
    const newAttendance = {
      employeeId: NormalEmployee.id,
      date: new Date(),
      status: 'present',
    };

    const response = await request(app)
      .post('/attendance/create')
      .set('Authorization', `${hrToken}`)
      .send(newAttendance)
      .expect(201);

    expect(response.body.date).toBe(newAttendance.date.toISOString());
    expect(response.body.status).toBe(newAttendance.status);
  });

  it('should update an attendance record successfully', async () => {
    const NormalEmployee = await Employee.create({
      name: 'Normal User',
      email: 'Employee4@example.com',
      password: authMethods.hashPassword('password'),
      group: 'Normal Employee',
    });
    const newAttendance = {
      employee: NormalEmployee.id,
      date: '12/12/2012',
      status: 'present',
    };

    const createdAttendance = await Attendance.create(newAttendance);
    const updatedAttendance = {
      status: 'absent',
    };

    const response = await request(app)
      .patch(`/attendance/update/${createdAttendance.id}`)
      .set('Authorization', `${hrToken}`)
      .send(updatedAttendance)
      .expect(200);

    expect(response.body.status).toBe(updatedAttendance.status);
  });
  it('should get an attendance record by its id successfully', async () => {
    const NormalEmployee = await Employee.create({
      name: 'Normal User',
      email: 'Employee8@example.com',
      password: authMethods.hashPassword('password'),
      group: 'Normal Employee',
    });
    const newAttendance = {
      employee: NormalEmployee.id,
      date: '12/12/2012',
      status: 'present',
    };

    const createdAttendance = await Attendance.create(newAttendance);

    const response = await request(app)
      .get(`/attendance/find/${createdAttendance.id}`)
      .set('Authorization', `${hrToken}`)
      .expect(200);

    expect(response.body.status).toBe(createdAttendance.status);
  });

  // Test for getting attendance by employee id
  it('should get an attendance record by employee id successfully', async () => {
    const NormalEmployee = await Employee.create({
      name: 'Normal User',
      email: 'Employee7@example.com',
      password: authMethods.hashPassword('password'),
      group: 'Normal Employee',
    });
    const newAttendance = {
      employee: NormalEmployee.id,
      date: '12/12/2012',
      status: 'present',
    };

    const createdAttendance = await Attendance.create(newAttendance);

    const response = await request(app)
      .get(`/attendance/employee/${NormalEmployee.id}`)
      .set('Authorization', `${hrToken}`)
      .expect(200);
    // Assuming that the response is an array of attendances
    expect(response.body.attendance[0].status).toBe(createdAttendance.status);
  });

  // Test for deleting attendance
  it('should delete an attendance record successfully', async () => {
    const NormalEmployee = await Employee.create({
      name: 'Normal User',
      email: 'Employee6@example.com',
      password: authMethods.hashPassword('password'),
      group: 'Normal Employee',
    });
    const newAttendance = {
      employee: NormalEmployee.id,
      date: '12/12/2012',
      status: 'present',
    };

    const createdAttendance = await Attendance.create(newAttendance);

    const response = await request(app)
      .delete(`/attendance/delete/${createdAttendance.id}`)
      .set('Authorization', `${hrToken}`)
      .expect(200);

    expect(response.body.message).toBe('Attendance deleted successfully');
  });
});
