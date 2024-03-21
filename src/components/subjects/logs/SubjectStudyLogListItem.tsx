import { formatSubjectSessionLoggedDate, formatSubjectSessionLoggedTime } from '../../../utils/helpers';
import { StudyLog } from '../../../utils/types';

type SubjectStudyLogListItemProps = {
  log: StudyLog;
};

const SubjectStudyLogListItem = (props: SubjectStudyLogListItemProps) => {
  return (
    <div className='flex flex-col gap-1 w-full p-2 border rounded-lg border-accent bg-primary'>
      <div className='flex items-center'>
        <p className='font-medium'>{props.log.subject_icon} {props.log.subject_name}</p>
        <p className='text-text-secondary text-xs ml-auto'>{formatSubjectSessionLoggedDate(props.log.date_logged)}</p>
      </div>
      <p className='text-sm'>Studied for <span className='text-blue-600'>{formatSubjectSessionLoggedTime(props.log.time_studied)}</span></p>
    </div>
  );
};

export default SubjectStudyLogListItem;