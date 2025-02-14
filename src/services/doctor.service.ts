import { DOCTOR_MODEL, PATIENT_MODEL } from '../models';
import { QueryOptions, Types } from 'mongoose';

import { IPatientModel } from '../types';
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


export const updateDoctor = async (id: Types.ObjectId, query: QueryOptions) => {
  try {
    const doctor = await DOCTOR_MODEL.findByIdAndUpdate(id, query, { new: true });
    return doctor;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const getDoctor = async (query: QueryOptions) => {
  try {
    const doctor = await DOCTOR_MODEL.findOne(query)
      .populate('user', 'email name')
      .populate('patients', 'name email');
    return doctor;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getDoctors = async (query: QueryOptions) => {
  try {
    const doctors = await DOCTOR_MODEL.find(query)
      .populate('user', 'email name')
      .populate('patients', 'name email');
    return doctors;
  } catch (error: any) {
    throw new Error(error);
  }
}


export const AddPatientMedicalHistory = async (patientId: Types.ObjectId, history: string) => {
  try {
    const patient = await PATIENT_MODEL.findOne<IPatientModel>({
      _id: patientId
    });
    if (!patient) {
      throw new Error('Patient not found');
    }
    patient.addMedicalHistory(history);
    return patient;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const ReadPatientMedicalHistory = async (patientId: Types.ObjectId) => {
  try {
    const patient = await PATIENT_MODEL.findOne<IPatientModel>({
      _id: patientId
    });
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient.medicalHistory;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const AddPatientNotes = async (patientId: Types.ObjectId, notes: string) => {
  try {
    const patient = await PATIENT_MODEL.findOne<IPatientModel>({
      _id: patientId
    });
    if (!patient) {
      throw new Error('Patient not found');
    }
    patient.addNote(notes);
    return patient;
  }
  catch (error: any) {
    throw new Error(error);
  }
}

export const ReadPatientNotes = async (patientId: Types.ObjectId) => {
  try {
    const patient = await PATIENT_MODEL.findOne<IPatientModel>({
      _id: patientId
    });
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient.notes;
  }
  catch (error: any) {
    throw new Error(error);
  }
}