import { Schema, model } from "mongoose";

import { IReminderModel } from "../types";
import dayjs from "dayjs";

const ReminderSchema = new Schema<IReminderModel>(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    task: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

ReminderSchema.methods.markAsCompleted = async function () {
  this.completed = true;
  await this.save();
};

// 🔹 Reschedule if the patient misses it
ReminderSchema.methods.rescheduleMissedReminder = async function () {
  if (!this.completed && dayjs(this.scheduledDate).isBefore(dayjs())) {
    this.scheduledDate = dayjs(this.scheduledDate).add(1, "day").toDate();
    await this.save();
  }
};

export default model<IReminderModel>("Reminder", ReminderSchema);
