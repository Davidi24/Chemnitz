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
      res.status(400).json({ message: value });
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
      favourites: user.favourites,
      location: user.location,
      bio: user.bio
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userEmail = (req as any).user.email; 
    if (!userEmail) {
      res.status(401).json({ error: "Unauthorized: no user email" });
      return;
    }

    const updates = { ...req.body } as Record<string, any>;

    if ('role' in updates || 'email' in updates || 'googleId' in updates) {
      res.status(400).json({ error: "Cannot update those fields" });
      return;
    }

    if (updates.password) {
      updates.passwordHash = await bcrypt.hash(updates.password, 10);
      delete updates.password;
    }

    const user = await UserModel.findOneAndUpdate(
      { email: userEmail },
      updates,
      { new: true, runValidators: true }
    ).select('-passwordHash -googleToken');

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
