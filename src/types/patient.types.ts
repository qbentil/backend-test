import { Types } from "mongoose";

export interface IPatient {
    code: string;
    user: Types.ObjectId;
    assignedDoctor?: Types.ObjectId;
    medicalHistory?: string[];
    notes?: string;
}

export interface IActionableStep {
    checklist: string[];
    plan: { task: string; date: Date }[];
}

export interface IPatientModel extends IPatient, Document {
    _id: Types.ObjectId;
    addMedicalHistory(history: string): void;
    addNote(note: string): void;
    assignDoctor(doctorId: Types.ObjectId): void;
    createdAt: Date;
    updatedAt: Date;
}