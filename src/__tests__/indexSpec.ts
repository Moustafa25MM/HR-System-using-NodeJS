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
