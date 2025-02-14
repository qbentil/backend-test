import { PATIENT_MODEL } from '../models';
import { Types } from 'mongoose';
import { __generateCode } from '../helpers';

export const initPatient = async (user: Types.ObjectId) => {
  try {
    const patient = await PATIENT_MODEL.create({
      user,
      code: await __generateCode('Patient')
    });
    return patient;
  } catch (error: any) {
    throw new Error(error);
  }
};
