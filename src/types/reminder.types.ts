import { Types } from "mongoose";

export interface IReminder {
  patient: Types.ObjectId;
  task: string;
  scheduledDate: Date;
  completed?: boolean;
}

export interface IReminderModel extends IReminder, Document {
  _id: Types.ObjectId;
  markAsCompleted(): Promise<void>;
  rescheduleMissedReminder(): Promise<void>;
  createdAt: Date;
  updatedAt: Date;
}
