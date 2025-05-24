export enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

import { Request } from 'express';
export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    roles: Role | Role[];
  };
}