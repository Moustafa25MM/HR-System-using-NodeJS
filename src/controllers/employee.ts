import { models } from '../models';

type UpdateEmployeeData = {
  name?: string;
  password?: string;
  email?: string;
  group?: string;
  netSalary?: number;
  grossSalary?: number;
  task?: string;
};

const create = (data: any) => models.Employee.create(data);

const getEmployee = (email: string) => {
  const employee = models.Employee.findOne({ email });
  return employee;
};

const getEmployeeById = (id: string) => {
  const employee = models.Employee.findById(id);
  return employee;
};

const updateEmployee = (id: string, data: UpdateEmployeeData) =>
  models.Employee.updateOne({ _id: id }, data, { runValidators: true });

const getAllEmployeesByGroup = async (group: string) => {
  const employees = models.Employee.find({ group });
  return employees;
};

const getAllNormalEmployees = async () => {
  return getAllEmployeesByGroup('Normal Employee');
};

const getAllHREmployees = async () => {
  return getAllEmployeesByGroup('HR');
};

export const employeeControllers = {
  create,
  getEmployee,
  updateEmployee,
  getEmployeeById,
  getAllEmployeesByGroup,
  getAllHREmployees,
  getAllNormalEmployees,
};
