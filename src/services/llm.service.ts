import { AIModel } from '../utils';

interface ChecklistInput {
  symptoms: string[];
  diagnosis: string;
  prescribedMedications: string[];
}

interface PlanInput {
  treatmentDuration: number;
  medicationFrequency: number;
}

export const generateChecklist = async (data: ChecklistInput) => {
  const prompt = `Generate a checklist for a patient with the following details:
    - Symptoms: ${data.symptoms.join(', ')}
    - Diagnosis: ${data.diagnosis}
    - Medications: ${data.prescribedMedications.join(', ')}`;

  const response = await AIModel.callLLM(prompt);
  return response;
};

export const generatePlan = async (data: PlanInput) => {
  const prompt = `Create a treatment plan:
    - Duration: ${data.treatmentDuration} days
    - Medication Frequency: ${data.medicationFrequency} times per day
    - Include any necessary precautions.`;

  const response = await AIModel.callLLM(prompt);
  return response;
};
