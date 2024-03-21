import mongoose from 'mongoose';

export interface IStudySession extends mongoose.Document {
  user: string;
  subject_name: string;
  subject_icon: string;
  time_studied: number;
  date_logged: Date;
}

const StudySessionSchema = new mongoose.Schema({

  user: {
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

  time_studied: {
    type: Number,
    required: true,
  },

  date_logged: {
    type: Date,
    required: true,
  },
});

const StudySession = mongoose.models.StudySession || mongoose.model<IStudySession>('StudySession', StudySessionSchema);

export default StudySession;