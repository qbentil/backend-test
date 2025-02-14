import { IActionableStep, IPatientModel } from "@/types";
import { __decryptData, __encryptData, callLLM } from "@/helpers";
import mongoose, { Model, Schema } from "mongoose";

import { createReminder } from "@/services";

const PatientSchema = new Schema<IPatientModel>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        },
        assignedDoctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        medicalHistory: {
            type: [String],
            default: []
        },
        notes: {
            type: String,
            default: null
        },
    },
    { timestamps: true }
);

// Encrypt notes before saving
PatientSchema.pre("save", async function (next) {
    if (this.isModified("notes") && this.notes) {
        this.notes = JSON.stringify(__encryptData(this.notes));
    }
    next();
});

// Method to add medical history
PatientSchema.methods.addMedicalHistory = function (history: string): void {
    this.medicalHistory.push(history);
    this.save();
};


// Method to assign a doctor
PatientSchema.methods.assignDoctor = function (doctorId: mongoose.Types.ObjectId): void {
    this.assignedDoctor = doctorId;
    this.save();
};

// Ensure decrypted notes when retrieving data
PatientSchema.methods.toJSON = function () {
    const patient = this.toObject();
    if (patient.notes) {
        try {
            const { data, tag } = JSON.parse(patient.notes);
            patient.notes = __decryptData(data, tag);
        } catch (error) {
            throw new Error("Error decrypting notes");
        }
        patient.notes = null;
    }
    return patient;
};


PatientSchema.methods.addNote = async function (note: string) {
    const patient = this;

    const encryptedNote = __encryptData(note);
    patient.notes = JSON.stringify(encryptedNote);
    await patient.save();

    const steps = await patient.extractActionableSteps(note);

    await patient.cancelPreviousReminders();

    await patient.scheduleReminders(steps);
};

// Extract actionable steps using LLM
PatientSchema.methods.extractActionableSteps = async function (note: string) {
    const response = await callLLM(note);
    return response as IActionableStep;
};

// 🔹 Schedule reminders
PatientSchema.methods.scheduleReminders = async function (steps: IActionableStep) {
    for (const planItem of steps.plan) {
        await createReminder({
            patient: this._id,
            task: planItem.task,
            scheduledDate: planItem.date,
            completed: false,
        });
    }
};

// 🔹 Cancel previous reminders
PatientSchema.methods.cancelPreviousReminders = async function () {
    await mongoose.model("Reminder").deleteMany({ patient: this._id });
};

const Patient: Model<IPatientModel> = mongoose.model<IPatientModel>("Patient", PatientSchema);

export default Patient;
