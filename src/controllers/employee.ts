import { models } from '../models';

const create = (data: any) => models.Employee.create(data);

export const employeeControllers = {
  create,
};
