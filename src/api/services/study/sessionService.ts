import StudySession from '../../models/StudySessions';
import { Tracker } from '../../utils/types';

export const fetchAllStudyTrackerSessionsForUser = async (email: string) => {
  const sessions = await StudySession.find({ user: email }).sort({ date_logged: -1 });
  return sessions;
};

export const logStudyTrackerSessionForSubject = async (tracker: Tracker, time: number, email: string) => {
  await StudySession.insertMany({
    user: email,
    subject_name: tracker.subject_name,
    subject_icon: tracker.subject_icon,
    time_studied: time,
    date_logged: new Date(),
  });
};