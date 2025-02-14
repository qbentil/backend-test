import { IReminder } from '../types';
import { QueryOptions } from 'mongoose';
import { REMINDER_MODEL } from '../models';

export const createReminder = async (reminder: IReminder) => {
  try {
    return REMINDER_MODEL.create(reminder);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getReminders = async (query: QueryOptions) => {
  try {
    return REMINDER_MODEL.find(query);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateReminder = async (
  query: QueryOptions,
  reminder: Partial<IReminder>
) => {
  try {
    return REMINDER_MODEL.findOneAndUpdate(query, reminder, { new: true });
  } catch (error: any) {
    throw new Error(error);
  }
};


export const getReminder = async (query: QueryOptions) => {
  try {
    return REMINDER_MODEL.findOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
}