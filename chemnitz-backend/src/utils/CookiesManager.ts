import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/userModel';
import { generateToken } from './jwtConfig';

export function setAccessTokenCookie(user: IUser, res: Response): void {
  const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;      // 604800 seconds
  const SEVEN_DAYS_IN_MS = 1000 * SEVEN_DAYS_IN_SECONDS; // 604800000 ms

  const token = generateToken(user, SEVEN_DAYS_IN_SECONDS);
  // console.log("Token Created: ", token)
  res.cookie('access-token', token, {
    httpOnly: true,
    secure: false,       // Set to true in production!
    sameSite: 'lax',
    maxAge: SEVEN_DAYS_IN_MS,
  });
  console.log(token)
  console.log("cookies set successfully")
}


export function clearAllCookies(req: Request, res: Response) {
  Object.keys(req.cookies).forEach((name) => {
    res.cookie(name, '', {
      httpOnly: true,
      secure: false,         // true in production
      sameSite: 'lax',
      expires: new Date(0),  // Expire immediately
      path: '/',
    });
  });
}

