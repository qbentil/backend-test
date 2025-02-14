import { Schema, model } from 'mongoose';

import { IDoctorModel } from '../types';
import { __encryptData } from '../helpers';

const DoctorSchema = new Schema<IDoctorModel>({
  code: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String
  },
  patients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Patient'
    }
  ]
});


export default model<IDoctorModel>('Doctor', DoctorSchema);
