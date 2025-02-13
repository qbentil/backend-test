import mongoose, { Document } from "mongoose";

import { SYS_USER_TYPE } from "./token.types";

export interface IUser {
  name: string;
  code: string;
  email: string;
  password: string;
  role: SYS_USER_TYPE
}

export interface IUserModel extends IUser, Document {
  generateAuthToken(): string;
  verifyPassword(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Types.ObjectId;
}
