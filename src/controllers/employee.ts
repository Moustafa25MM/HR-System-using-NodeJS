import { models } from '../models';

const create = (data: any) => models.Employee.create(data);

const getEmployee = (email: string) => {
  const employee = models.Employee.findOne({ email });
  return employee;
};

export const employeeControllers = {
  create,
  getEmployee,
};
