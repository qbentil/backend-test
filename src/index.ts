import { AUTH_ROUTES, DOCTURE_ROUTES, PATIENT_ROUTES } from "./routes";
import express, { Express, Request, Response } from "express";

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

APP.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

APP.listen(port, () => {
  console.log(`[⚡]: Server is running on PORT:${port} in ${process.env.NODE_ENV} mode🕹️`);
});