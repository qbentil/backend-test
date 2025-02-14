import { DOCTOR_MODEL, PATIENT_MODEL } from '../models';
import { QueryOptions, Types } from 'mongoose';

import { ApiError } from '../utils';
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
    const doctor = await DOCTOR_MODEL.findByIdAndUpdate(id, query, {
      new: true
    });
    return doctor;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getDoctor = async (query: QueryOptions) => {
  try {
    const doctor = await DOCTOR_MODEL.findOne(query)
      .populate('user', 'email name')
      .populate('patients', 'name email');
    return doctor;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getDoctors = async (query: QueryOptions) => {
  try {
    const doctors = await DOCTOR_MODEL.find(query)
      .populate('user', 'email name')
      .populate('patients', 'name email');
    return doctors;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const AddPatientMedicalHistory = async (
  patientId: Types.ObjectId,
  history: string
) => {
  try {
    const patient = await PATIENT_MODEL.findOne<IPatientModel>({
      _id: patientId
    });
    if (!patient) {
      throw new Error('Patient not found');
    }
    patient.addMedicalHistory(history);
    return patient;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ReadPatientMedicalHistory = async (patientId: Types.ObjectId) => {
  try {
    const patient = await PATIENT_MODEL.findOne<IPatientModel>({
      _id: patientId
    });
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient.medicalHistory;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const AddPatientNotes = async (
  patientId: Types.ObjectId,
  notes: string
) => {
  try {
    const patient = await PATIENT_MODEL.findOne<IPatientModel>({
      _id: patientId
    });
    if (!patient) {
      throw new Error('Patient not found');
    }
    patient.addNote(notes);
    return patient;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ReadPatientNotes = async (patientId: Types.ObjectId) => {
  try {
    const patient = await PATIENT_MODEL.findOne<IPatientModel>({
      _id: patientId
    });
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient.notes;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const MyPatients = async (doctorId: Types.ObjectId) => {
  try {
    const myPatients = await DOCTOR_MODEL.aggregate([
      { $match: { _id: doctorId } }, // Match the doctor by ID
      {
        $lookup: {
          from: 'patients', // Assuming 'patients' is the collection name
          localField: 'patients', // Field in the Doctor model
          foreignField: '_id', // Field in the Patient model
          as: 'patientDetails'
        }
      },
      {
        $unwind: '$patientDetails' // Unwind the array to work with individual patient documents
      },
      {
        $lookup: {
          from: 'users', // Assuming 'users' is the collection name
          localField: 'patientDetails.user', // Assuming Patient model has a `user` reference
          foreignField: '_id', // Field in the User model
          as: 'patientDetails.userInfo'
        }
      },
      {
        $unwind: '$patientDetails.userInfo' // Unwind the user info
      },
      {
        $project: {
          _id: '$patientDetails._id', // Keep patient ID
          name: '$patientDetails.userInfo.name', // Get name from User model
          email: '$patientDetails.userInfo.email', // Get email from User model
          assignedDoctor: 1 // Include other fields if needed
        }
      }
    ]);

    if (!myPatients.length) {
      throw new ApiError('No patients found for this doctor', 404);
    }

    return myPatients;
  } catch (error: any) {
    throw new ApiError(error.message || 'Error fetching patients', 500);
  }
};

export const MyPatient = async (
  doctorId: Types.ObjectId,
  patientId: Types.ObjectId
) => {
  try {
    const patient = await DOCTOR_MODEL.aggregate([
      { $match: { _id: doctorId } }, // Match the doctor by ID
      {
        $lookup: {
          from: 'patients', // Assuming 'patients' is the collection name
          localField: 'patients', // Field in the Doctor model
          foreignField: '_id', // Field in the Patient model
          as: 'patientDetails'
        }
      },
      {
        $unwind: '$patientDetails' // Unwind the array to work with individual patient documents
      },
      {
        $lookup: {
          from: 'users', // Assuming 'users' is the collection name
          localField: 'patientDetails.user', // Assuming Patient model has a `user` reference
          foreignField: '_id', // Field in the User model
          as: 'patientDetails.userInfo'
        }
      },
      {
        $unwind: '$patientDetails.userInfo' // Unwind the user info
      },
      {
        $match: {
          'patientDetails._id': patientId
        }
      },
      {
        $project: {
          _id: '$patientDetails._id', // Keep patient ID
          name: '$patientDetails.userInfo.name', // Get name from User model
          email: '$patientDetails.userInfo.email', // Get email from User model
          assignedDoctor: 1 // Include other fields if needed
        }
      }
    ]);

    if (!patient.length) {
      throw new ApiError('Patient not found', 404);
    }

    return patient[0];
  } catch (error: any) {
    throw new ApiError(error.message || 'Error fetching patient', 500);
  }
};
