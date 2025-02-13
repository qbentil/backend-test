import { PATIENT_MODEL } from "@/models";
import { Types } from "mongoose";

export const initPatient = async (user:Types.ObjectId) => {
    const patient = await PATIENT_MODEL.create({ user });
    return patient;
}