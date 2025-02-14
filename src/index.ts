import { AUTH_ROUTES, DOCTURE_ROUTES, PATIENT_ROUTES } from "./routes";
import express, { Express, Request, Response } from "express";

import { Errorhandler } from "./middlewares";
import { MONGOBD_CONNECT } from "./database";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const APP: Express = express();
const port = process.env.PORT || 3000;

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(cors (
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

APP.use("/auth", AUTH_ROUTES)
APP.use("/patient", PATIENT_ROUTES)
APP.use("/doctor", DOCTURE_ROUTES)


// Error Handler
APP.use(Errorhandler);

MONGOBD_CONNECT(() => {
    APP.listen(port, () => {
        console.log(`[⚡🕹️]: Server is running on port ${port}`)
    })
})