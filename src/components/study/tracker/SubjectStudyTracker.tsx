import { formatFancyTime } from '../../../utils/helpers';
import { Tracker } from '../../../utils/types';

type SubjectStudyTrackerProps = {
  tracker: Tracker;
  openSetupModal: (tracker: Tracker) => void;
  openEditModal: (tracker: Tracker) => void;
};

const SubjectStudyTracker = (props: SubjectStudyTrackerProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-40 min-w-max p-8 rounded-lg bg-primary border border-accent'>
      <p className='text-2xl'>{props.tracker.subject_icon}</p>
      <p className='text-m text-text font-medium'>{props.tracker.subject_name}</p>
      {props.tracker.is_setup ?
        <>
          <div className='mb-1 text-sm text-text-secondary'>{formatFancyTime(props.tracker.time_allocated)} allocated</div>
          <div className='flex gap-4 mt-1'>
            <button className='bg-primary border border-accent rounded-md h-8 px-3 hover:bg-accent text-sm' onClick={() => props.openEditModal(props.tracker)}>Edit</button>
            <a className='flex items-center bg-primary border border-accent rounded-md h-8 px-3 hover:bg-accent hover:cursor-pointer text-sm' href={`study/${props.tracker.subject_id}`}>Study</a>
          </div>
        </>
        :
        <>
          <div className='mb-1 text-sm text-text-secondary'>No study time allocated</div>
          <div className='flex gap-4 mt-1'>
            <button className='bg-primary border border-accent rounded-md h-8 px-3 hover:bg-accent text-sm' onClick={() => props.openSetupModal(props.tracker)}>Setup study tracker</button>
          </div>
        </>
      }
    </div>
  );
};

export default SubjectStudyTracker;