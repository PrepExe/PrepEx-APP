import { v4 as uuidv4 } from 'uuid';
import Assessment from '../models/Assessment';
import { Subject } from '../utils/types';

export const createAssessment = async (subject: Subject, date: Date, description: string, email: string) => {
  const assessmentId = uuidv4();

  const newAssessment = await Assessment.create({
    assessment_id: assessmentId,
    user: email,
    subject_id: subject.subject_id,
    subject_name: subject.subject_name,
    subject_icon: subject.subject_icon,
    description,
    date,
  });

  return newAssessment;
};

export const editAssessment = async (assessmentId: string, date: Date, description: string) => {
  await Assessment.findOneAndUpdate({ assessment_id: assessmentId }, { $set: { date, description } });
  const updatedAssessment = await Assessment.findOne({ assessment_id: assessmentId });
  return updatedAssessment;
};

export const deleteAssessment = async (assessmentId: string) => {
  await Assessment.findOneAndDelete({ assessment_id: assessmentId });
};