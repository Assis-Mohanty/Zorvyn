import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

export interface JwtPayload {
  userId: number;
  role: string;
}

export const signToken = (payload: JwtPayload): string =>
  jwt.sign(payload, SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string): JwtPayload =>
  jwt.verify(token, SECRET) as JwtPayload;
