import * as jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';
import { Role } from '../types/userTypes';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'fallback-secret-key';
console.log("secret key = ", JWT_SECRET);

interface TokenPayload {
  email: string;
  roles: Role;  
}

export function generateToken(user: IUser, expiresInSeconds: number): string {
  return jwt.sign(
    { email: user.email, roles: user.role }, 
    JWT_SECRET, 
    { expiresIn: expiresInSeconds }
  );
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}



