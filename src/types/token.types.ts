import { Types } from 'mongoose';

export const SYS_USER_TYPES = ['DOCTOR', 'PATIENT'] as const;

export type SYS_USER_TYPE = (typeof SYS_USER_TYPES)[number];

export interface TokenPayload {
  id: Types.ObjectId;
  role: SYS_USER_TYPE;
}
