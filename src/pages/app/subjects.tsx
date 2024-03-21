import { NextPage } from 'next';
import Sidebar from '../../components/sidebar/Sidebar';
import SubjectItem from '../../components/subjects/SubjectItem';
import SubjectAddButton from '../../components/subjects/SubjectAddButton';
import SubjectStudyLogList from '../../components/subjects/logs/SubjectStudyLogList';
import AddSubjectModal from '../../components/subjects/modal/add/AddSubjectModal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Subject } from '../../utils/types';
import SubjectItemSkeleton from '../../components/subjects/SubjectItemSkeleton';
import RemoveSubjectModal from '../../components/subjects/modal/RemoveSubjectModal';

const SubjectsPage: NextPage = () => {

  const [isAddSubjetModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [isRemoveSubjectModalOpen, setIsRemoveSubjectModalOpen] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject>({} as Subject);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('/api/subjects');
        setSubjects(res.data.subjects);
      } catch (err: any) {
        console.error('Error fetching subjects:', err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const openAddSubjectModal = () => setIsAddSubjectModalOpen(true);

  const openRemoveSubjectModal = (subject: Subject) => {
    setIsRemoveSubjectModalOpen(true);
    setSelectedSubject(subject);
  };

  const closeModal = () => {
    setIsAddSubjectModalOpen(false);
    setIsRemoveSubjectModalOpen(false);
  };

  const removeSubject = async (id: string) => {
    try {
      await axios.post('/api/subjects/remove', { id });
      setSubjects(subjects.filter((subject: Subject) => subject.subject_id !== id));
      closeModal();
    } catch (err: any) {
      console.error('Error removing subjects:', err.response.data.error);
    }
  };

  return (
    <div className='container h-screen'>
      <Sidebar />
      <div className='ml-72 h-full w-5/6 p-4 mb-2'>
        <p className='text-4xl font-semibold mb-4'>Subjects</p>
        <div className='flex flex-row gap-12 mt-2 w-full min-h-full pb-10'>
          <div className='bg-primary border border-accent rounded-lg p-4 w-3/5'>
            <h1 className='font-semibold mb-4'>Subjects</h1>
            <div className='grid grid-cols-2 grid-flow-row gap-4'>
              {isLoading ? (
                [...Array(6)].map((x, i) => (
                  <SubjectItemSkeleton key={i} />
                ))
              ) : (
                <>
                  {subjects.map((subject, index) => (
                    <SubjectItem key={index} subject={subject} openRemoveSubjectModal={openRemoveSubjectModal} setSelectedSubject={setSelectedSubject} />
                  ))}
                  <SubjectAddButton openModal={openAddSubjectModal} />
                </>
              )}
            </div>
          </div>
          <SubjectStudyLogList />
        </div>
        {isAddSubjetModalOpen && <AddSubjectModal closeModal={closeModal} subjects={subjects} setSubjects={setSubjects} />}
        {isRemoveSubjectModalOpen && <RemoveSubjectModal closeModal={closeModal} confirm={removeSubject} subject={selectedSubject} />}
      </div>
    </div >
  );
};

export default SubjectsPage;