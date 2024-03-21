import { formatFancyAssessmentOverviewDate } from '../../../utils/helpers';

type AssessmentOverviewItemProps = {
  subject_icon: string;
  subject_name: string;
  date: Date;
  description: string;
};

const AssessmentOverviewItem = (props: AssessmentOverviewItemProps) => {
  return (
    <div className='border border-accent rounded-lg px-2 py-2'>
      <div className='flex items-center'>
        <p className='font-medium'>{props.subject_icon} {props.subject_name}</p>
        <div className='text-sm w-fit rounded-md ml-auto text-text-secondary'>{formatFancyAssessmentOverviewDate(props.date)}</div>
      </div>
      <p className='font-normal text-sm'>{props.description}</p>
    </div>
  );
};

export default AssessmentOverviewItem;