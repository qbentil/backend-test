import { DOCTOR_MODEL } from '../models';
import { Types } from 'mongoose';
import { __generateCode } from '../helpers';

export const initDoctor = async (user: Types.ObjectId) => {
  try {
    const doctor = await DOCTOR_MODEL.create({
      user,
      code: await __generateCode('Doctor')
    });
    return doctor;
  } catch (error: any) {
    throw new Error(error);
  }
};
