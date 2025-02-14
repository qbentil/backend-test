import { IUser, IUserModel } from '../types';

import { ApiError } from '../utils';
import { USER_MODEL } from '../models';

export const signup = async (input: IUser) => {
  try {
    return USER_MODEL.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const login = async (input: { email: string; password: string }) => {
  try {
    const user = await USER_MODEL.findOne<IUserModel>({ email: input.email });

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    // Verify password using the user model's verifyPassword method
    const isMatch = await user.verifyPassword(input.password);
    if (!isMatch) {
      throw new ApiError('Invalid password', 401);
    }

    // update last login
    await user.updateLastLogin();

    // Generate token using the user model's generateAuthToken method
    const token = await user.generateAuthToken();

    return { user, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
