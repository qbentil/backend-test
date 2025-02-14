import { ChooseDoctor } from '../controllers';
import { Router } from 'express';
import { ValidationMiddleware } from '../middlewares';

const route = Router();

route.post('/select-doctor',
   ChooseDoctor
  );

// get reminders
route.get('/reminders', (req, res) => {
  res.send('Reminders');
});

// get patient profile
route.get('/profile', (req, res) => {
  res.send('Profile');
});

export default route;
