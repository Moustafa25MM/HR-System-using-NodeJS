import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { authMethods } from './auth';
import { employeeControllers } from '../controllers/employee';

dotenv.config();

type UpdateEmployeeData = {
  name?: string;
  password?: string;
  email?: string;
  group?: string;
};

const createEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, group } = req.body;
  let { password } = req.body;

  password = authMethods.hashPassword(password);

  try {
    const employee = await employeeControllers.create({
      name,
      password,
      email,
      group,
    });

    if (!employee) {
      throw new Error('Failed to create employee');
    }

    return res.status(201).json(employee);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
const updateEmployeeFunc = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, email, group } = req.body;

  let { password } = req.body;

  if (password) {
    password = authMethods.hashPassword(password);
  }

  const updateObject: UpdateEmployeeData = {
    name,
    email,
    password,
    group,
  };

  if (Object.values(updateObject).every((value) => value === undefined)) {
    return res.status(400).json({ error: 'Invalid update data was provided' });
  }

  try {
    const existingEmployee = await employeeControllers.getEmployeeById(id);

    if (!existingEmployee) {
      throw new Error('Employee not found');
    }

    const updatedResult = await employeeControllers.updateEmployee(
      id,
      updateObject
    );

    if (!updatedResult) {
      throw new Error('Failed to update employee');
    }
    const updatedEmployee = await employeeControllers.getEmployeeById(id);
    if (!updatedEmployee) {
      throw new Error('Failed to fetch updated employee data');
    }

    const { _id, name, email, group } = updatedEmployee;

    const updatedEmployeeData = {
      id: _id,
      name,
      email,
      group,
    };

    return res.status(200).json(updatedEmployeeData);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const employeeMiddelwares = {
  createEmployee,
  updateEmployeeFunc,
};
