import bcrypt from 'bcrypt';

import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const JWTSecret = process.env.JWT_SECRET;

const hashPassword = (password: String): String =>
  bcrypt.hashSync(password as string, 10);

const comparePasswd = async (
  enteredPassword: string,
  DB_password: any
): Promise<boolean> => {
  const result = await bcrypt.compare(enteredPassword, DB_password);
  return result;
};

type IokenPayload = {
  id: string;
};

const generateJWT = (payload: IokenPayload): String =>
  jwt.sign(payload, JWTSecret as string, { expiresIn: '7d' });
export const authMethods = {
  hashPassword,
  comparePasswd,
  generateJWT,
};
