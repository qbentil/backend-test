import { Router } from 'express';

const router = Router();

// update information
router.put('/update', async (req, res) => {
  res.send('update information');
});

// add note to patient
router.post('/add-note', async (req, res) => {
  res.send('add note to patient');
});

// get all patients
router.get('/patients', async (req, res) => {
  res.send('get all patients');
});

// get patient by id
router.get('/patient/:id', async (req, res) => {});

// retrive reminders
router.get('/reminders', async (req, res) => {});

export default router;
