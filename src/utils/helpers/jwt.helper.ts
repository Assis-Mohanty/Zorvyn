import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

export interface JwtPayload {
  userId: number;
  role: string;
}


export async function generateJWT(payload: JwtPayload, secret: string , expiresIn?: SignOptions['expiresIn']): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn }, (err: any, token: string | undefined) => {
            if (err || !token) {
                reject(err || new Error("Failed to generate JWT"));
            } else {
                resolve(token);
            }
        });
    });
}

export async function verifyJWT(token: string, secret: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as JwtPayload);
            }
        });
    });
}