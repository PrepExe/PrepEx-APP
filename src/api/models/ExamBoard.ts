import mongoose from 'mongoose';

export interface IExamBoard extends mongoose.Document {
  exam_board: string;
  levels: string[];
}

const ExamBoardSchema = new mongoose.Schema({

  exam_board: {
    type: String,
    required: true,
  },

  levels: [{
    type: String,
    required: true,
  }],
});

const ExamBoard = mongoose.models.ExamBoard || mongoose.model<IExamBoard>('ExamBoard', ExamBoardSchema);

export default ExamBoard;
