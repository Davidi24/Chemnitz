import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/userModel';
import { generateToken } from './jwtConfig';

export function setAccessTokenCookie(user: IUser, res: Response): void {
  const token = generateToken(user, 3600);
  res.cookie('access-token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, 
  });
  console.log("cookies set succesfully")
}


export function clearAllCookies(req: Request, res: Response): void {
  const cookies = req.cookies;
  if (cookies) {
    Object.keys(cookies).forEach(cookieName => {
      res.clearCookie(cookieName, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });
    });
    console.log("Cookies cleared sucessfully")
  }
}

