import { ChangeEvent, FormEvent, useState } from 'react';
import DateSelector from '../../dashboard/DateSelector';
import axios from 'axios';
import { Assessment, SetAssessments } from '../../../utils/types';

type AddAssessmentModalProps = {
  closeModal: () => void;
  assessment: Assessment;
  assessments: Assessment[];
  setAssessments: SetAssessments;
};

const EditAssessmentModal = (props: AddAssessmentModalProps) => {
  const [date, setDate] = useState<Date>(new Date(props.assessment.date));
  const [description, setDescription] = useState<string>(props.assessment.description);

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const descriptionData = e.target.value;
    setDescription(descriptionData);
  };

  const editAssessment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assessmentFormData = {
      assessmentId: props.assessment.assessment_id,
      date,
      description,
    };

    try {
      const response = await axios.put('/api/assessments/edit', assessmentFormData);
      props.setAssessments(props.assessments.map((assessment: Assessment) =>
        assessment.assessment_id === response.data.updatedAssessment.assessment_id
          ? { ...assessment, date: response.data.updatedAssessment.date, description: response.data.updatedAssessment.description }
          : assessment,
      ));
    } catch (err: any) {
      console.error('Error editing assessment', err.response.data.error);
    }

    props.closeModal();
  };

  return (
    <>
      <div className='fixed z-40 flex items-center justify-center bg-modal-backdrop w-full h-full top-0 left-0' onClick={props.closeModal}></div>
      <div className='fixed z-50 flex flex-col w-1/5 h-auto p-4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary'>
        <h1 className='font-semibold'>Editing assessment</h1>
        <form className='flex flex-row items-baseline space-y-4 gap-4 h-full' onSubmit={editAssessment}>
          <div className='mt-2 flex flex-col gap-4 w-full'>
            <div className='inline-flex border border-accent bg-lighter-accent rounded-md p-2 cursor-default'>
              <div className='outline-none w-full'>
                {props.assessment.subject_icon} {props.assessment.subject_name}
              </div>
            </div>
            <DateSelector date={date} setSelectedDate={setDate} />
            <div className='inline-flex border border-accent rounded-md p-2' onChange={handleDescriptionChange}>
              <textarea placeholder='Description (optional)' className='w-full resize-none outline-none bg-primary' defaultValue={props.assessment.description} />
            </div>
            <div className='flex gap-2 mt-2 ml-auto'>
              <button type='button' className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={props.closeModal}>Cancel</button>
              <button className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm'>Save</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAssessmentModal;