import mongoose from 'mongoose';

export interface IAssessment extends mongoose.Document {
  assessment_id: string;
  user: string;
  subject_id: string;
  subject_name: string;
  subject_icon: string
  description?: string;
  date: Date;
}

const AssessmentSchema = new mongoose.Schema({

  assessment_id: {
    type: String,
    required: true,
  },

  user: {
    type: String,
    required: true,
  },

  subject_id: {
    type: String,
    required: true,
  },

  subject_name: {
    type: String,
    required: true,
  },

  subject_icon: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    required: true,
  },
});

const Assessment = mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', AssessmentSchema);

export default Assessment;