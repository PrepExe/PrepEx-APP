import type { NextPage } from 'next';
import Sidebar from '../../components/sidebar/Sidebar';
import SubjectOverview from '../../components/dashboard/subjects/SubjectOverview';
import AssessmentOverview from '../../components/dashboard/assessments/AssessmentOverview';
import PastPaperOverview from '../../components/dashboard/papers/PastPaperOverview';
import EventList from '../../components/dashboard/EventList';
import SubjectOverviewPagination from '../../components/dashboard/subjects/SubjectOverviewPagination';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Tracker } from '../../utils/types';
import SubjectOverviewAddButton from '../../components/dashboard/subjects/SubjectOverviewAddButton';

const DashboardPage: NextPage = () => {

  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [allTrackersSetup, setAllTrackersSetup] = useState(false);

  useEffect(() => {
    const fetchTrackers = async () => {
      try {
        const res = await axios.get('/api/study/trackers/weekly');
        setTrackers(res.data.weeklyTrackers);
        setAllTrackersSetup(res.data.isAllTrackersSetup);
      } catch (err: any) {
        console.error('Error fetching weekly study trackers:', err.response.data.error);
      }
    };

    fetchTrackers();
  }, []);

  return (
    <div className='container h-screen'>
      <Sidebar />
      <div className='ml-72 h-full w-5/6 p-4 mb-2'>
        <p className='text-4xl font-semibold mb-4'>Dashboard</p>
        <div className='flex flex-row gap-12 mt-2 w-full min-h-full pb-10'>
          <div className='flex flex-col gap-8 w-full'>
            <div className='bg-primary border border-accent h-4/5 rounded-lg p-4'>
              <h1 className='font-semibold mb-4'>Study overview</h1>
              <SubjectOverviewPagination />
              <div className='grid grid-cols-2 gap-4'>
                {trackers.map(tracker => (
                  <SubjectOverview tracker={tracker} key={tracker.tracker_id} />
                ))}
                {!allTrackersSetup && <SubjectOverviewAddButton />}
              </div>
            </div>
            <PastPaperOverview />
          </div>
          <div className='flex flex-col w-4/5 h-auto gap-8 flex-grow'>
            <AssessmentOverview />
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
