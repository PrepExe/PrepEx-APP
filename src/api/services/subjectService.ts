import User from '../models/User';
import CambridgeSubject from '../models/CambridgeSubject';
import StudyTracking from '../models/StudyTracking';
import { v4 as uuidv4 } from 'uuid';

export const updateSubjectForUser = async (id: string, email: string, operation: 'add' | 'remove') => {
  const updateSubjectData = operation === 'add' ? { $push: { subjects: id } } : { $pull: { subjects: id } };

  await User.findOneAndUpdate({ email }, updateSubjectData);

  return CambridgeSubject.findOne({ subject_id: id });
};

export const createStudyTrackerAndAddToUser = async (subjectId: string, email: string) => {
  const trackerId = uuidv4();

  const subjectDetails = await CambridgeSubject.findOne({ subject_id: subjectId });

  await StudyTracking.create({
    tracker_id: trackerId,
    user: email,
    subject_id: subjectId,
    subject_name: subjectDetails.subject_name,
    subject_icon: subjectDetails.subject_icon,
  });

  await User.findOneAndUpdate({ email }, { $push: { trackers: trackerId } });
};

export const deleteStudyTrackerAndRemoveFromUser = async (subjectId: string, email: string) => {
  const tracker = await StudyTracking.findOneAndDelete({ subject_id: subjectId, user: email });
  await User.findOneAndUpdate({ email }, { $pull: { trackers: tracker.tracker_id } });
};