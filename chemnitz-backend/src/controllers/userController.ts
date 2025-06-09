import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel';
import { AuthenticatedRequest } from '../types/userTypes';
import { validateParam } from "../validations/authValidation";


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
          
    const value = validateParam(name, email, password);
    if (value != null) {
    console.log("value: ", value)
      res.status(400).json({ message: value});
      return;
    }
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      email,
      passwordHash,
      name,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export async function getUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }
    const user = await UserModel.findOne({ email: req.user.email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}