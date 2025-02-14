import { NextFunction, Request, Response } from 'express';
import { PatientProfile, optDoctor } from '../services';

import { ResponseHandler } from '../handers';

export const ChooseDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if(!req.body.doctor){
            new ResponseHandler(res).failure("Doctor ID is required");
        }
        const patient = await optDoctor(req.tokenPayload?.id!, req.body.doctor);

        if (patient) {
            new ResponseHandler(res).success("Doctor assigned successfully");
        }

    } catch (error: any) {
        next(error)
    }
}



export const patientProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    


    // Fetch the patient profile using the PatientProfile function from services
    const patientProfileData = await PatientProfile(req.tokenPayload?.id!);

    if (!patientProfileData) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found',
      });
    }

    // Return the patient profile data in the response
    return new ResponseHandler(res).successWithData(patientProfileData)

  } catch (error) {
    // Pass any errors to the next middleware or error handler
    next(error);
  }
};
