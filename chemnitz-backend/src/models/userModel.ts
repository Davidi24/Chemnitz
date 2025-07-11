import { Schema, model, Document } from 'mongoose';
import { Role } from "../types/userTypes";

export interface IUser extends Document {
  email: string;
  passwordHash?: string;
  name?: string;
  role: Role;
  googleId?: string;
  googleToken?: string;
  favourites: string[];
  bio?: string;         
  location?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  name: { type: String },
  role: { type: String },
  googleId: { type: String, unique: true },
  googleToken: { type: String },
  favourites: [{ type: String }],
    bio: { type: String },          
  location: { type: String },     
});

export const UserModel = model<IUser>('User', userSchema);
