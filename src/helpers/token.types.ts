import { Types } from 'mongoose';

export const SYS_USER_TYPES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR'
};

export type SYS_USER_TYPE = keyof typeof SYS_USER_TYPES;

export interface TokenPayload {
  id: Types.ObjectId;
  type: SYS_USER_TYPE;
}
