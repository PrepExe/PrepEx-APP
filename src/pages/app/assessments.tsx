import type { NextPage } from 'next';
import Sidebar from '../../components/sidebar/Sidebar';
import AssessmentPastPaper from '../../components/assessments/AssessmentPastPaper';
import AssessmentItem from '../../components/assessments/AssessmentItem';
import AddAssessmentButton from '../../components/assessments/AddAssessmentButton';
import { useEffect, useState } from 'react';
import AddAssessmentModal from '../../components/assessments/modal/AddAssessmentModal';
import axios from 'axios';
import EditAssessmentModal from '../../components/assessments/modal/EditAssessmentModal';
import { Assessment } from '../../utils/types';
import DeleteAssessmentModal from '../../components/assessments/modal/DeleteAssessmentModal';

const AssessmentsPage: NextPage = () => {

  const [isAddAssessmentModalOpen, setIsAddAssessmentModalOpen] = useState(false);
  const [isEditAssessmentModalOpen, setIsEditAssessmentModalOpen] = useState(false);
  const [isDeleteAssessmentModalOpen, setIsDeleteAssessmentModalOpen] = useState(false);
  const [selectedEditingAssessment, setSelectedEditingAssessment] = useState<Assessment>({} as Assessment);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [pastDueAssessments, setPastDueAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await axios.get('/api/assessments');

        setAssessments([]); // remove possible duplicate assessments
        setPastDueAssessments([]); // reset past duplicate assessments

        res.data.assessments.forEach((assessment: Assessment) => {
          if (new Date(assessment.date) < new Date()) {
            setPastDueAssessments(prevPastDueAssessments => [...prevPastDueAssessments, assessment]);
          } else {
            setAssessments(prevAssessments => [...prevAssessments, assessment]);
          }
        });

      } catch (err: any) {
        console.error('Error fetching assessments:', err.response.data.error);
      }
    };

    fetchAssessments();
  }, []);

  const openAddAssessmentModal = () => setIsAddAssessmentModalOpen(true);

  const openEditAssessmentModal = (assessment: Assessment) => {
    setSelectedEditingAssessment(assessment);
    setIsEditAssessmentModalOpen(true);
  };

  const openDeleteAssessmentModal = (assessment: Assessment) => {
    setIsDeleteAssessmentModalOpen(true);
    setSelectedEditingAssessment(assessment);
  };

  const closeModal = () => {
    setIsAddAssessmentModalOpen(false);
    setIsEditAssessmentModalOpen(false);
    setIsDeleteAssessmentModalOpen(false);
    setSelectedEditingAssessment({} as Assessment);
  };

  const deleteAssessment = async (assessmentId: string) => {
    try {
      await axios.post('/api/assessments/delete', { assessmentId });
      setAssessments(assessments.filter((assessment: Assessment) => assessment.assessment_id !== assessmentId));
      setPastDueAssessments(pastDueAssessments.filter((assessment: Assessment) => assessment.assessment_id !== assessmentId));
      closeModal();
    } catch (err: any) {
      console.error('Error deleting assessment:', err.response.data.error);
    }
  };

  return (
    <div className='container h-screen'>
      <Sidebar />
      <div className='ml-72 h-full w-5/6 p-4 mb-2'>
        <p className='text-4xl font-semibold mb-4'>Assessments</p>
        <div className='flex flex-col gap-12 mt-2 w-full pb-10'>
          <div className='bg-primary border border-accent rounded-lg p-4 w-full'>
            <h1 className='font-semibold mb-4'>Past papers</h1>
            <div className='grid grid-flow-row grid-cols-3 gap-4 pb-4'>
              <AssessmentPastPaper />
              <AssessmentPastPaper />
              <AssessmentPastPaper />
              <AssessmentPastPaper />
            </div>
          </div>
          <div className='bg-primary border border-accent rounded-lg p-4 w-full'>
            <h1 className='font-semibold mb-4'>Upcoming assessments</h1>
            <div className='grid grid-flow-row grid-cols-3 gap-4 auto-cols-min pb-4'>
              {assessments.map((assessment: Assessment) => (
                <AssessmentItem
                  key={assessment.assessment_id}
                  assessment={assessment}
                  openDeleteAssessmentModal={openDeleteAssessmentModal}
                  deleteAssessment={deleteAssessment}
                  openEditAssessmentModal={openEditAssessmentModal}
                />
              ))}
              <AddAssessmentButton openModal={openAddAssessmentModal} />
            </div>
          </div>
          {pastDueAssessments.length > 0 &&
            <div className='bg-primary border border-accent rounded-lg p-4 w-full'>
              <h1 className='font-semibold mb-4'>Past due assessments</h1>
              <div className='grid grid-flow-row grid-cols-3 gap-4 auto-cols-min pb-4'>
                {pastDueAssessments.map((assessment: Assessment) => (
                  <AssessmentItem
                    key={assessment.assessment_id}
                    assessment={assessment}
                    deleteAssessment={deleteAssessment}
                    openEditAssessmentModal={openEditAssessmentModal}
                    pastDue={true}
                  />
                ))}
              </div>
            </div>
          }
        </div>
      </div>
      {isAddAssessmentModalOpen && <AddAssessmentModal closeModal={closeModal} assessments={assessments} setAssessments={setAssessments} />}
      {isEditAssessmentModalOpen && <EditAssessmentModal closeModal={closeModal} assessment={selectedEditingAssessment} assessments={assessments} setAssessments={setAssessments} />}
      {isDeleteAssessmentModalOpen && <DeleteAssessmentModal closeModal={closeModal} confirm={deleteAssessment} assessment={selectedEditingAssessment} />}
    </div>
  );
};

export default AssessmentsPage;
