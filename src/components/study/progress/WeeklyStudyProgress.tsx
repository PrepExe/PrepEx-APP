import { Tracker } from '../../../utils/types';
import SubjectStudyProgress from './SubjectStudyProgress';

type WeeklyStudyProgressProps = {
  trackers: Tracker[];
};

const WeeklyStudyProgress = (props: WeeklyStudyProgressProps) => {
  return (
    <div className='bg-primary border border-accent rounded-lg p-4 w-full'>
      <h1 className='font-semibold mb-4'>Weekly progress</h1>
      <div className='flex gap-4 pb-4 overflow-y-auto'>
        {(props.trackers.filter((tracker: Tracker) => tracker.is_setup !== false)).map((tracker: Tracker) => (
          <SubjectStudyProgress tracker={tracker} key={tracker.tracker_id} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyStudyProgress;