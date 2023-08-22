import { Request, Response } from 'express';
import { authMethods } from './auth';
import { employeeControllers } from '../controllers/employee';

const employeeLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const employeeDataFromDB: any = await employeeControllers.getEmployee(email);

  if (!employeeDataFromDB) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  if (employeeDataFromDB.group !== 'HR') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const compare = await authMethods.comparePasswd(
    password,
    employeeDataFromDB.password
  );
  if (!compare) res.status(401).json({ error: 'Invalid email or password' });
  else {
    const token = authMethods.generateJWT({ id: employeeDataFromDB.id });

    const employeeData = {
      id: employeeDataFromDB.id,
      name: employeeDataFromDB.name,
      email: employeeDataFromDB.email,
      group: employeeDataFromDB.group,
    };

    res.status(200).json({ token, employee: employeeData });
  }
};

const employeeLogout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const loginMethods = {
  employeeLogin,
  employeeLogout,
};
