import { DOCTOR_MODEL } from "@/models";
import { Types } from "mongoose";

export const initDoctor = async (user:Types.ObjectId) => {
    const doctor = await DOCTOR_MODEL.create({ user });
    return doctor;
}