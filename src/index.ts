import { AUTH_ROUTES, DOCTURE_ROUTES, PATIENT_ROUTES } from './routes';
import {
  AuthenticateUser,
  AuthenticateUserbyRole
} from './middlewares/auth.middleware';
import { SYS_USER_TYPE, TokenPayload } from './types';
import express, { Express, Request, Response } from 'express';
import {
  generateChecklistController,
  generatePlanController
} from './controllers';

import { AppConstants } from './constants';
import { Errorhandler } from './middlewares';
import { MONGOBD_CONNECT } from './database';
import cors from 'cors';
import dotenv from 'dotenv';

declare module 'express-serve-static-core' {
  interface Request {
    tokenPayload?: TokenPayload;
  }
}
dotenv.config();

const APP: Express = express();
const port = process.env.PORT || 3000;

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

APP.use('/auth', AUTH_ROUTES);
APP.use(
  '/patient',
  AuthenticateUser,
  AuthenticateUserbyRole(AppConstants.ROLES.PATIENT as SYS_USER_TYPE),
  PATIENT_ROUTES
);
APP.use(
  '/doctor',
  DOCTURE_ROUTES,
  AuthenticateUser,
  AuthenticateUserbyRole(AppConstants.ROLES.DOCTOR as SYS_USER_TYPE)
);

// Some AI test enpoints
APP.post('/ai/generate-checklist', generateChecklistController);
APP.get('/ai/generate-plan', generatePlanController);

// Error Handler
APP.use(Errorhandler);

MONGOBD_CONNECT(() => {
  APP.listen(port, () => {
    console.log(`[⚡🕹️]: Server is running on port ${port}`);
  });
});
