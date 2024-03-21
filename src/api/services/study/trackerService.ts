import { convertTimeToSeconds, updateAndFetchTracker } from '../../utils/helpers';

export const setupStudyTrackerForSubject = async (trackerId: string, hours: number, minutes: number) => {
  const updateData = { is_setup: true, time_allocated: convertTimeToSeconds(hours, minutes) };
  return updateAndFetchTracker(trackerId, updateData);
};

export const editStudyTrackerTimeForSubject = async (trackerId: string, hours: number, minutes: number) => {
  const updateData = { time_allocated: convertTimeToSeconds(hours, minutes) };
  return updateAndFetchTracker(trackerId, updateData);
};

export const removeStudyTrackerForSubject = async (trackerId: string) => {
  const updateData = { is_setup: false, time_allocated: 0, time_studied: 0, completed: false };
  return updateAndFetchTracker(trackerId, updateData);
};

export const updateStudyTrackerTimerForSubject = async (trackerId: string, timeStudied: number) => {
  const updateData = { time_studied: timeStudied };
  return updateAndFetchTracker(trackerId, updateData);
};