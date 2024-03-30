import axios from "axios";

export type Subject = {
  subject_id: string;
  subject_name: string;
  subject_board: string;
  subject_level: string;
  subject_icon: string;
};

export type SetSubjects = React.Dispatch<React.SetStateAction<Subject[]>>;
export type SetSubject = React.Dispatch<React.SetStateAction<Subject | undefined>>;

export type ExamBoard = {
  exam_board: string;
  levels: string[];
};

export type Assessment = {
  assessment_id: string;
  user: string;
  subject_id: string;
  subject_name: string;
  subject_icon: string;
  description: string;
  date: Date;
};

export type SetAssessments = React.Dispatch<React.SetStateAction<Assessment[]>>;

export type Tracker = {
  tracker_id: string;
  user: string;
  subject_id: string;
  subject_name: string;
  subject_icon: string
  is_setup: boolean;
  time_allocated: number;
  time_studied: number;
  completed: boolean;
};

export type SetTrackers = React.Dispatch<React.SetStateAction<Tracker[]>>;

export type StudyLog = {
  user: string;
  subject_name: string;
  subject_icon: string;
  time_studied: number;
  date_logged: Date;
};

export type SetNumberState = React.Dispatch<React.SetStateAction<number>>;
export type SetStringState = React.Dispatch<React.SetStateAction<string>>;
export type SetDateState = React.Dispatch<React.SetStateAction<Date>>;
export default axios.create({
  baseURL: 'http://65.0.18.163:3000/',
});

//itha thooki jsonla podu
// "proxy": "http://65.0.18.163:3000/",