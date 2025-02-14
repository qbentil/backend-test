import { IUserModel, SYS_USER_TYPES } from '../types';
import {
  __encryptPassword,
  __generateAuthToken,
  __verifyPassword
} from '../helpers';
import { initDoctor, initPatient } from '../services';
import mongoose, { Model, Schema } from 'mongoose';

const UserSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: SYS_USER_TYPES,
      required: true
    },
    meta: {
      lastLogin: {
        type: Date,
        default: Date.now
      }
    }
  },
  { timestamps: true }
);

// Initialize patient/doctor on new user creation
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    if (this.role === 'PATIENT') {
      await initPatient(this._id);
    } else if (this.role === 'DOCTOR') {
      await initDoctor(this._id);
    }
  }
  next();
});

// Encrypt password before saving user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await __encryptPassword(this.password);
  next();
});

// Method to generate JWT token
UserSchema.methods.generateAuthToken = async function (): Promise<string> {
  return await __generateAuthToken({
    id: this._id,
    role: this.role
  });
};

// Method to verify password
UserSchema.methods.verifyPassword = function (
  password: string
): Promise<boolean> {
  return __verifyPassword(password, this.password);
};

// Method to update last login
UserSchema.methods.updateLastLogin = function (): void {
  this.meta.lastLogin = new Date();
  this.save();
};

const User: Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);

export default User;
