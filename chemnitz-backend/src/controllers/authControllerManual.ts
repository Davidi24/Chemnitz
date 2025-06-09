import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel';
import { setAccessTokenCookie, clearAllCookies } from "../utils/CookiesManager";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, googleToken } = req.body;

    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID!,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        res.status(401).json({ message: 'Google authentication failed' });
        return;
      }

      let user = await UserModel.findOne({ email: payload.email });
      if (!user) {
        user = new UserModel({
          email: payload.email,
          username: payload.given_name,
          googleId: payload.sub,
        });
        await user.save();
      }

      setAccessTokenCookie(user, res);
      res.status(200).json({ message: 'Login successful' });
      return;
    }

    if (!password) {
      res.status(400).json({ message: 'Password is required' });
      return;
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    if (user.passwordHash) {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
    } else {
      res.status(401).json({ message: 'Password not set for manual login' });
      return;
    }

    setAccessTokenCookie(user, res);
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    clearAllCookies(req, res);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
};
