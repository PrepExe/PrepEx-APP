import { ChangeEvent, useEffect, useState } from 'react';
import { SetSubject, SetSubjects, Subject } from '../../../../utils/types';
import axios from 'axios';

type AddSubjectModalSubjectProps = {
  closeModal: () => void;
  subjects: Subject[];
  setSubjects: SetSubjects;
  selectedSubject: Subject | undefined;
  setSelectedSubject: SetSubject;
  examBoard: string;
  examBoardLevel: string;
};

const AddSubjectModalSubject = (props: AddSubjectModalSubjectProps) => {
  const [search, setSearch] = useState('');
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('/api/subjects/list');

        // Filter out subjects that are already in the user's subjects
        const userSubjects = props.subjects.map((subject) => subject.subject_id);
        res.data.subjects = res.data.subjects.filter((subject: Subject) => !userSubjects.includes(subject.subject_id));

        // Filter out subjects that don't match the exam board and level
        res.data.subjects = res.data.subjects.filter((subject: Subject) => subject.subject_board === props.examBoard && subject.subject_level === props.examBoardLevel);

        setSubjectList(res.data.subjects);
        setFilteredSubjects(res.data.subjects);
      } catch (err: any) {
        console.error('Error fetching subjects:', err.response.data.error);
      }
    };

    fetchSubjects();
  }, [props.subjects, props.examBoard, props.examBoardLevel]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setFilteredSubjects(subjectList.filter((subject) => subject.subject_name.toLowerCase().includes(searchValue.toLowerCase())));

    if (searchValue !== '' && props.selectedSubject) {
      props.setSelectedSubject(undefined);
    }
  };

  const selectSubject = (subject: Subject) => {
    props.setSelectedSubject(subject);
  };

  return (
    <div className='fixed z-50 flex flex-col w-2/6 h-auto p-4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary'>
      <h1 className='font-semibold'>Select a {props.examBoard} {props.examBoardLevel} subject</h1>
      <div className='flex flex-row items-start space-y-4 gap-4 h-full'>
        <div className='w-full'>
          <input type='text' name='subject' id='subject' className='bg-primary border border-darker-accent rounded-lg block w-full p-2.5 my-2 focus:outline-darker-accent placeholder:text-text-secondary' placeholder='Search subjects...' autoComplete='off' value={search} onChange={handleSearch} />
          <ul className='bg-primary border border-accent rounded-lg mt-2 overflow-y-scroll h-64'>
            {filteredSubjects.map((subject, index) => (
              <li key={index} className='h-14 w-full p-2 hover:bg-accent hover:cursor-pointer' onClick={() => selectSubject(subject)}>
                <p className='font-medium'>{subject.subject_name}</p>
                <p className='text-xs text-text-secondary'>{subject.subject_level}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModalSubject;