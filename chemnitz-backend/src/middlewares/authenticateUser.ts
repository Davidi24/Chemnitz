import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtConfig';
import { AuthenticatedRequest } from '../types/userTypes';

export function authenticateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
    console.log("here")
  const token = req.cookies['access-token'];
  if (!token) {
    res.status(401).json({ message: 'Not authenticated' });
    return; 
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

  req.user = {
    email: payload.email,
    roles: payload.roles,
  };

  next();
}
