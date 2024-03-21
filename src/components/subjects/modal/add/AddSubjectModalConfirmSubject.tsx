import { SyntheticEvent } from 'react';
import { SetSubject, SetSubjects, Subject } from '../../../../utils/types';
import axios from 'axios';

type AddSubjectModalConfirmProps = {
  closeModal: () => void;
  subjects: Subject[];
  setSubjects: SetSubjects;
  selectedSubject: Subject;
  setSelectedSubject: SetSubject;
};

const AddSubjectModalConfirm = (props: AddSubjectModalConfirmProps) => {

  const resetSelectedSubject = () => {
    props.setSelectedSubject(undefined);
  };

  const addSubject = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/subjects/add', { id: props.selectedSubject?.subject_id });
      props.setSubjects([...props.subjects, res.data.addedSubject]);
      props.closeModal();
    } catch (err: any) {
      console.error('Error adding subject:', err.response.data.error);
    }
  };

  return (
    <div className='fixed z-50 flex flex-col w-2/5 h-auto p-4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary'>
      <h1 className='font-semibold'>Add a new subject</h1>
      <form className='w-full' onSubmit={addSubject}>
        <div className='flex flex-row items-baseline space-y-2 gap-4 mb-4'>
          <div className='w-full'>
            <label htmlFor='subject' className='block mb-2 text-sm font-medium'>Subject</label>
            <div className='flex flex-col gap-2 bg-primary border border-accent h-32 rounded-lg p-4'>
              <p className='text-blue-600 hover:cursor-pointer hover:underline w-fit' onClick={resetSelectedSubject}>← Back to list</p>
              <div className='flex flex-row'>
                <p className='text-lg font-medium'>{props.selectedSubject.subject_icon} {props.selectedSubject.subject_name}</p>
                <div className='bg-accent rounded-lg py-1 px-2 ml-auto text-text-secondary text-sm'>{props.selectedSubject.subject_level}</div>
              </div>
              <p className='text-text-secondary'>{props.selectedSubject.subject_board}</p>
            </div>
          </div>
          <div className='h-5/6'>
            <label htmlFor='subject' className='block mb-2 text-sm font-medium'>Icon</label>
            <div className='flex flex-col gap-4 h-full'>
              <div className='flex items-center justify-center bg-primary border border-accent h-32 w-32 rounded-md'>
                <p className='text-5xl hover:cursor-pointer hover:bg-accent rounded p-4'>{props.selectedSubject.subject_icon}</p>
              </div>
            </div>
            <button className='bg-primary border border-accent rounded-md h-10 w-full px-4 hover:bg-accent text-sm font-medium mt-4'>Add subject</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSubjectModalConfirm;