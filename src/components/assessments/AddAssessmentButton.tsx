import { PlusIcon } from '@heroicons/react/24/outline';

type AddAssessmentButtonProps = {
  openModal: () => void;
};

const AddAssessmentButton = (props: AddAssessmentButtonProps) => {
  return (
    <div className='flex items-center justify-center min-h-28 h-full w-full rounded-lg bg-primary border border-accent hover:bg-accent hover:cursor-pointer' onClick={props.openModal}>
      <p className='text-text-secondary '><PlusIcon className='w-6 h-6' /></p>
    </div>
  );
};

export default AddAssessmentButton;