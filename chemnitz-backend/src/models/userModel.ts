import { Schema, model, Document } from 'mongoose';
import { Role } from "../types/userTypes";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  role: Role
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
});

export const UserModel = model<IUser>('User', userSchema);
