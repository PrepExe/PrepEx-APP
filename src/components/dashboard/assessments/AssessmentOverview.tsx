import { useEffect, useState } from 'react';
import AssessmentOverviewItem from './AssessmentOverviewItem';
import axios from 'axios';
import { Assessment } from '../../../utils/types';

const AssessmentOverview = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await axios.get('/api/assessments');
        setAssessments(res.data.assessments);
      } catch (err: any) {
        console.error('Error fetching assessments:', err.response.data.error);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <aside className='w-full h-1/2 p-4 border rounded-lg border-accent bg-primary'>
      <h1 className='font-semibold pb-2'>Upcoming assessments</h1>
      <div className='overflow-y-auto flex flex-col gap-2 h-80 w-full rounded pr-4'>
        {assessments.map((assessment: Assessment) => (
          new Date(assessment.date) > new Date() && (
            <AssessmentOverviewItem key={assessment.assessment_id} subject_icon={assessment.subject_icon} subject_name={assessment.subject_name} date={assessment.date} description={assessment.description} />
          )
        ))}
      </div>
    </aside>
  );
};

export default AssessmentOverview;