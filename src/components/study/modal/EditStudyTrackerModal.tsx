import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { getHours, getMinutes } from '../../../utils/helpers';
import { Tracker } from '../../../utils/types';

type EditStudyTrackerModalProps = {
  tracker: Tracker;
  closeModal: () => void;
  updateTrackers: (tracker: Tracker) => void;
};

const EditStudyTrackerModal = (props: EditStudyTrackerModalProps) => {
  const [hours, setHours] = useState(getHours(props.tracker.time_allocated));
  const [minutes, setMinutes] = useState(getMinutes(props.tracker.time_allocated));

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const changedHours = (value === '' ? 0 : parseInt(value));
    setHours(changedHours);
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const changedMinutes = (value === '' ? 0 : parseInt(value));
    setMinutes(changedMinutes);
  };

  const editTracker = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/study/trackers/edit', { id: props.tracker.tracker_id, hours, minutes });
      props.updateTrackers(res.data.updatedTracker);
      props.closeModal();
    } catch (err: any) {
      console.error('Error editing tracker:', err.response.data.error);
    }
  };

  const removeTracker = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/study/trackers/remove', { id: props.tracker.tracker_id });
      props.updateTrackers(res.data.removedTracker);
      props.closeModal();
    } catch (err: any) {
      console.error('Error removing tracker:', err.response.data.error);
    }
  };

  return (
    <>
      <div className='fixed z-40 flex items-center justify-center bg-modal-backdrop w-full h-full top-0 left-0' onClick={props.closeModal}></div>
      <div className='fixed z-50 flex flex-col w-fit h-auto p-4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary'>
        <h1 className='font-semibold'>Edit study tracker</h1>
        <form className='flex flex-row items-baseline space-y-4 gap-4 h-full'>
          <div className='mt-2 flex flex-col'>
            <div className='inline-flex border border-accent rounded-md p-2'>
              <div className='flex gap-2 items-center'>
                <h3>{props.tracker.subject_icon} {props.tracker.subject_name}:</h3>
                <div className='flex'>
                  <div className='flex items-center relative w-fit'>
                    <input type='text' className='block px-2 outline-none appearance-none bg-transparent border border-accent rounded w-20' onChange={handleHoursChange} value={hours} />
                    <span className='flex items-center justify-center absolute right-0 bg-lighter-accent border border-accent rounded p-2 h-full z-10'>hrs</span>
                  </div>
                  <span className="px-1">:</span>
                  <div className='flex items-center relative w-fit'>
                    <input type='text' className='block px-2 outline-none appearance-none bg-transparent border border-accent rounded w-24' onChange={handleMinutesChange} value={minutes} />
                    <span className='flex items-center justify-center absolute right-0 bg-lighter-accent border border-accent rounded p-2 h-full z-10'>mins</span>
                  </div>
                  <span className="px-1 ml-1">per week</span>
                </div>
              </div>
            </div>
            <div className='flex gap-2 mt-2 justify-between'>
              <button type='button' className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm text-red-500' onClick={removeTracker}>Remove</button>
              <div className='flex gap-2'>
                <button type='button' className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={props.closeModal}>Cancel</button>
                <button className='bg-primary border border-accent rounded-md h-8 w-fit px-3 hover:bg-accent text-sm' onClick={editTracker}>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div >
    </>
  );
};

export default EditStudyTrackerModal;