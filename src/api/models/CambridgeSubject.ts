import mongoose from 'mongoose';

export interface ICambridgeSubject extends mongoose.Document {
  subject_id: string;
  subject_name: string;
  subject_board: string;
  subject_level: string;
  subject_icon: string;
}

const CambridgeSubjectSchema = new mongoose.Schema({

  subject_id: {
    type: String,
    required: true,
  },

  subject_name: {
    type: String,
    required: true,
  },

  subject_board: {
    type: String,
    required: true,
  },

  subject_level: {
    type: String,
    required: true,
  },

  subject_icon: {
    type: String,
    required: true,
  },
});

const CambridgeSubject = mongoose.models.CambridgeSubject || mongoose.model<ICambridgeSubject>('CambridgeSubject', CambridgeSubjectSchema);

export default CambridgeSubject;
