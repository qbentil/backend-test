import { IActionableStep } from "./patient.types";
import { Types } from "mongoose";

export interface IDoctor {
    user: Types.ObjectId;
    specialization?: string;
    patients: Types.ObjectId[];
}


export interface IDoctorModel extends IDoctor, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
