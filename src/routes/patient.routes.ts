import { ChooseDoctor, MyReminders, patientProfile } from "../controllers";

import { Router } from "express";

const route = Router();

route.post("/select-doctor", ChooseDoctor);

// get reminders
route.get("/reminders", MyReminders);

// get patient profile
route.get("/profile", patientProfile);

export default route;
