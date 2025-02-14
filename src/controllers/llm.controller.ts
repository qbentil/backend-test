import { NextFunction, Request, Response } from 'express';
import { generateChecklist, generatePlan } from '../services';

import { ApiError } from '../utils';

export const generateChecklistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { symptoms, diagnosis, prescribedMedications } = req.body;

    if (!symptoms || !diagnosis || !prescribedMedications) {
      res.status(400).json({ error: 'Missing required fields.' });
    }

    const checklist = await generateChecklist({
      symptoms,
      diagnosis,
      prescribedMedications
    });

    res.status(200).json({ checklist });
  } catch (error) {
    next(error);
  }
};

export const generatePlanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { treatmentDuration, medicationFrequency } = req.query;

    if (!treatmentDuration || !medicationFrequency) {
      throw new ApiError('Missing body', 400);
    }

    const plan = await generatePlan({
      treatmentDuration: Number(treatmentDuration),
      medicationFrequency: Number(medicationFrequency)
    });

    res.status(200).json({ plan });
  } catch (error) {
    next(error);
  }
};
