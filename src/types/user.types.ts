import mongoose, { Document } from 'mongoose';

import { SYS_USER_TYPE } from './token.types';

export interface IUser {
  name: string;
  code: string;
  email: string;
  password: string;
  role: SYS_USER_TYPE;
  meta: {
    lastLogin: Date;
  };
}

export interface IUserModel extends IUser, Document {
  generateAuthToken(): string;
  verifyPassword(password: string): Promise<boolean>;
  updateLastLogin(): void;
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Types.ObjectId;
}
