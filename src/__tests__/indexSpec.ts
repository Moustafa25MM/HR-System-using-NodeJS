import request from 'supertest';
import { app } from '..';
import mongoose from 'mongoose';
import Employee from '../models/employee';
import { authMethods } from '../middlewares/auth';

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
});
