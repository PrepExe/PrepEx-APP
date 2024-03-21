import { useState, useEffect } from 'react';
import { formatFancyTime, formatSubjectTimer } from '../../../utils/helpers';
import axios from 'axios';
import { Tracker } from '../../../utils/types';

type TimerProps = {
  tracker: Tracker;
};

const SubjectTimer = (props: TimerProps) => {
  const [time, setTime] = useState(props.tracker.time_allocated - props.tracker.time_studied);
  const [isPaused, setIsPaused] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(0);

  const updateTimer = async () => {
    try {
      await axios.put('/api/study/trackers/update', { id: props.tracker.tracker_id, time: props.tracker.time_allocated - time });
    } catch (err: any) {
      console.error('Error updating tracker:', err.response.data.error);
    }
  };

  const logStudySession = async () => {
    try {
      await axios.post('/api/study/sessions/log', { tracker: props.tracker, time: sessionTime });
      setSessionStarted(false);
      setSessionTime(0);
    } catch (err: any) {
      console.error('Error logging session:', err.response.data.error);
    }
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timer;
    if (!isPaused && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (time % 60 == 0) updateTimer();
        if (sessionStarted) {
          setSessionTime(Math.floor((Date.now() - sessionStartTime) / 1000));
        }
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  });

  const handleStart = () => {
    setIsPaused(false);
    setSessionStarted(true);
    setSessionStartTime(Date.now());
  };

  const handleResume = () => setIsPaused(false);

  const handlePause = () => {
    setIsPaused(true);
    updateTimer();
  };

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const timeRemaining = formatSubjectTimer(hours, minutes, seconds);

  return (
    <div className='bg-primary border border-accent rounded-lg p-4 w-full'>
      <h1 className='font-semibold mb-4'>Timer</h1>
      <div className='flex flex-col items-center justify-center gap-4 pb-4'>
        <div className='flex flex-col items-center gap-1'>
          <h1 className='text-4xl font-semibold'>{timeRemaining}</h1>
          <p>of <span className='text-blue-500 font-medium mt-0'>{formatFancyTime(props.tracker.time_allocated)}</span> remaining</p>
        </div>
        <div className='flex gap-4'>
          {isPaused ?
            <>
              {!sessionStarted
                ? <button className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={handleStart}>Start session</button>
                : <>
                  <button className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={handleResume}>Resume</button>
                  <button className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={logStudySession}>Log session</button>
                </>
              }
            </>
            :
            <button className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={handlePause}>Pause</button>
          }
        </div>
      </div>
    </div>
  );
};

export default SubjectTimer;
