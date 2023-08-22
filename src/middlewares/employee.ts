import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { authMethods } from './auth';
import { employeeControllers } from '../controllers/employee';

dotenv.config();

const createEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, group } = req.body;
  let { password } = req.body;

  password = authMethods.hashPassword(password);

  const employee = await employeeControllers.create({
    name,
    password,
    email,
    group,
  });

  if (!employee) throw new Error('Error: employee is not created');

  return res.status(201).json(employee);
};

export const employeeMiddelwares = {
  createEmployee,
};
