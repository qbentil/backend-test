import * as Services from '../services';

import { NextFunction, Request, Response } from 'express';

import { ResponseHandler } from '../handers';

export const ChooseDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.doctor) {
      new ResponseHandler(res).failure('Doctor ID is required');
    }
    const patient = await Services.optDoctor(
      req.tokenPayload?.id!,
      req.body.doctor
    );

    if (patient) {
      new ResponseHandler(res).success('Doctor assigned successfully');
    }
  } catch (error: any) {
    next(error);
  }
};

export const patientProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientProfileData = await Services.PatientProfile(
      req.tokenPayload?.id!
    );

    if (!patientProfileData) {
      res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    } else {
      new ResponseHandler(res).successWithData(patientProfileData);
    }
  } catch (error) {
    next(error);
  }
};

export const MyReminders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reminders = await Services.getReminder({
      patient: req.tokenPayload?.id!
    });

    // Return the reminders
    new ResponseHandler(res).successWithData(reminders);
  } catch (error: any) {
    next(error);
  }
};
