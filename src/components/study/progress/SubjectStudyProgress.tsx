import { formatWeeklyProgressBar, formatWeeklyProgressTime } from '../../../utils/helpers';
import { Tracker } from '../../../utils/types';

const SubjectStudyProgress = (props: { tracker: Tracker }) => {
  return (
    <div className='flex flex-col items-center justify-center h-32 min-w-max p-8 rounded-lg bg-primary border border-accent'>
      <p className='text-2xl'>{props.tracker.subject_icon}</p>
      <p className='text-m text-text font-medium'>{props.tracker.subject_name}</p>
      <div className='mb-1 text-sm text-text-secondary'>{formatWeeklyProgressTime(props.tracker.time_studied, props.tracker.time_allocated)}</div>
      <div className='w-full bg-darker-accent rounded-full h-1.5 mb-4'>
        <div className='bg-blue-600 h-1.5 rounded-full' style={{ width: `${formatWeeklyProgressBar(props.tracker.time_studied, props.tracker.time_allocated)}%` }}></div>
      </div>
    </div>
  );
};

export default SubjectStudyProgress;