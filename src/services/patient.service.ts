import { DOCTOR_MODEL, PATIENT_MODEL } from '../models';
import mongoose, { Types } from 'mongoose';

import { ApiError } from '../utils';
import { IPatientModel } from '../types';
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


export const optDoctor = async (patient: Types.ObjectId, doctor: Types.ObjectId) => {
  try {
    // Find the doctor by ID
    const patientDoctor = await DOCTOR_MODEL.findOne({ _id: doctor });
    if (!patientDoctor) {
      throw new ApiError('Doctor not found', 404);
    }

    if (patientDoctor.patients.includes(new Types.ObjectId(patient))) {
      throw new ApiError('Patient already assigned to doctor', 400);
    }

    // Assign patient to doctor
    patientDoctor.patients.push(patient);
    await patientDoctor.save();

    const updatedPatient = await PATIENT_MODEL.findOneAndUpdate(
      {user: patient},
      { assignedDoctor: doctor },
      { new: true }
    );


    
    if(!updatedPatient){
      throw new ApiError('Patient not found', 404);
    }


    return updatedPatient;

  } catch (error: any) {
    console.error("Error updating patient:", error);
    throw new Error(error);
  }
};

export const PatientProfile = async (patientId: Types.ObjectId) => {
  try {
    // Fetch the patient using the provided patient ID and populate foreign fields
    const patient = await PATIENT_MODEL.findById(patientId)
      .populate("user", "name email")
      .populate('assignedDoctor', 'name email')

    if (!patient) {
      throw new ApiError('Patient not found', 404); 
    }

    return patient; 
  } catch (error: any) {
    throw new ApiError(error.message || 'Error fetching patient profile', 500);
  }
};
