import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DateSelector from '../../dashboard/DateSelector';
import axios from 'axios';
import { Assessment, SetAssessments, Subject } from '../../../utils/types';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type AddAssessmentModalProps = {
  closeModal: () => void;
  assessments: Assessment[];
  setAssessments: SetAssessments;
};

const AddAssessmentModal = (props: AddAssessmentModalProps) => {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject>({} as Subject);
  const [date, setDate] = useState<Date>(tomorrow);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('/api/subjects');
        const subjectsData = res.data.subjects.map(({ subject_id, subject_icon, subject_name }: Subject) => ({
          subject_id,
          subject_icon,
          subject_name,
        }));

        setSubjects(subjectsData);
        setSelectedSubject(subjectsData[0]);
      } catch (err: any) {
        console.error('Error fetching subjects:', err.response.data.error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSubjectId = e.target.options[e.target.selectedIndex].dataset.id;
    const subject = subjects.find((subj: Subject) => subj.subject_id === selectedSubjectId);

    if (subject) setSelectedSubject(subject);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const addAssessment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assessmentFormData = {
      subject: selectedSubject,
      date,
      description,
    };

    try {
      const res = await axios.post('/api/assessments/add', assessmentFormData);
      props.setAssessments([...props.assessments, res.data.newAssessment]);
    } catch (err: any) {
      console.error('Error adding assessment:', err.response.data.error);
    }

    props.closeModal();
  };

  return (
    <>
      <div className='fixed z-40 flex items-center justify-center bg-modal-backdrop w-full h-full top-0 left-0' onClick={props.closeModal}></div>
      <div className='fixed z-50 flex flex-col w-1/5 h-auto p-4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary'>
        <h1 className='font-semibold'>Add new assessment</h1>
        <form className='flex flex-row items-baseline space-y-4 gap-4 h-full' onSubmit={addAssessment}>
          <div className='mt-2 flex flex-col gap-4 w-full'>
            <div className='grid'>
              <ChevronDownIcon className='w-3 h-3 pointer-events-none z-10 right-2 relative col-start-1 row-start-1 self-center justify-self-end' strokeWidth={'4'} />
              <select className='appearance-none w-full row-start-1 col-start-1 p-2 outline-none border border-accent rounded-md bg-primary hover:bg-lighter-accent' onChange={handleSubjectChange}>
                {subjects.map((subject: Subject) => (
                  <option key={subject.subject_id} data-id={subject.subject_id}>{subject.subject_icon} {subject.subject_name}</option>
                ))}
              </select>
            </div>
            <DateSelector setSelectedDate={setDate} />
            <div className='inline-flex border border-accent rounded-md p-2' onChange={handleDescriptionChange}>
              <textarea placeholder='Description (optional)' className='w-full resize-none outline-none bg-primary' />
            </div>
            <div className='flex gap-2 mt-2 ml-auto'>
              <button type='button' className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={props.closeModal}>Cancel</button>
              <button className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm'>Add</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAssessmentModal;