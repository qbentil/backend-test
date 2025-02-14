import {
  AddNoteToPatient,
  Doctorpatients,
  GetPatientById,
  UpdateDoctorInformation
} from '../controllers';

import { Router } from 'express';

const router = Router();

// update information
router.put('/update', UpdateDoctorInformation);

// add note to patient
router.post('/add-note', AddNoteToPatient);

// get all patients
router.get('/patients', Doctorpatients);

// get patient by id
router.get('/patient/:id', GetPatientById);

// retrive reminders
router.get('/reminders', async (req, res) => {});

export default router;
