import * as Services from "../services";

import { NextFunction, Request, Response } from "express";

import { ResponseHandler } from "../handers";
import { Types } from "mongoose";

export const UpdateDoctorInformation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedDoc = Services.updateDoctor(req.tokenPayload?.id!, {
      ...req.body,
    });
    new ResponseHandler(res).successWithData(updatedDoc);
  } catch (error: any) {
    next(error);
  }
};

export const AddNoteToPatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { patientId, note } = req.body;
    const patient = await Services.AddPatientMedicalHistory(patientId, note);
    new ResponseHandler(res).successWithData(patient);
  } catch (error: any) {
    next(error);
  }
};

export const GetPatientNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { patientId } = req.params;
    const notes = await Services.ReadPatientNotes(
      new Types.ObjectId(patientId),
    );
    return new ResponseHandler(res).successWithData(notes);
  } catch (error: any) {
    next(error);
  }
};

export const GetPatientMedicalHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { patientId } = req.params;
    const history = await Services.ReadPatientMedicalHistory(
      new Types.ObjectId(patientId),
    );
    return new ResponseHandler(res).successWithData(history);
  } catch (error: any) {
    next(error);
  }
};

export const AddPatientMedicalHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { patientId, history } = req.body;
    const patient = await Services.AddPatientMedicalHistory(patientId, history);
    new ResponseHandler(res).successWithData(patient);
  } catch (error: any) {
    next(error);
  }
};

export const Doctorpatients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tokenPayload } = req;
    const patients = await Services.MyPatients(tokenPayload?.id!);
    new ResponseHandler(res).successWithData(patients);
  } catch (error: any) {
    next(error);
  }
};

export const GetPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { tokenPayload } = req;
    const patient = await Services.MyPatient(
      tokenPayload?.id!,
      new Types.ObjectId(id),
    );
    new ResponseHandler(res).successWithData(patient);
  } catch (error: any) {
    next(error);
  }
};
