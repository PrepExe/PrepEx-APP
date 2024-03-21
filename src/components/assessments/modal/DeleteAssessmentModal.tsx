import { Assessment } from '../../../utils/types';

type DeleteAssessmentModalProps = {
  assessment: Assessment;
  confirm: (assessmentId: string) => void;
  closeModal: () => void;
};

const DeleteAssessmentModal = (props: DeleteAssessmentModalProps) => {

  return (
    <>
      <div className='fixed z-40 flex items-center justify-center bg-modal-backdrop w-full h-full top-0 left-0' onClick={props.closeModal}></div>
      <div className='fixed z-50 flex flex-col w-fit h-auto p-4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary'>
        <h1 className='font-semibold'>Are you sure?</h1>
        <span className=' mt-1 text-text-secondary text-sm max-w-sm'>You are about to delete an upcoming assessment</span>
        <div className='mt-2 flex flex-col gap-4 w-full'>
          <div className='inline-flex border border-accent bg-lighter-accent rounded-md p-2 cursor-default'>
            <div className='outline-none w-full'>
              {props.assessment.subject_icon} {props.assessment.subject_name}
            </div>
          </div>
          <div className='flex gap-2 ml-auto'>
            <button type='button' className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={props.closeModal}>Cancel</button>
            <button className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm text-red-500' onClick={() => props.confirm(props.assessment.assessment_id)}>Confirm</button>
          </div>
        </div>
      </div>
    </>
  );

};

export default DeleteAssessmentModal;