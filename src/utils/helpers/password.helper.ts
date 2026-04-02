import bcrypt from 'bcrypt';
import { serverConfig } from '../../config';
const SALT = serverConfig.SALT

export const hashPassword = (plain: string): Promise<string> =>
  bcrypt.hash(plain, SALT);

export const comparePassword = (plain: string, hash: string): Promise<boolean> =>
  bcrypt.compare(plain, hash);
