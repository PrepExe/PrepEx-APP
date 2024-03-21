import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/outline';

const SubjectOverviewPagination = () => {
  return (
    <div className='flex items-center gap-2 my-4'>
      <button className='flex items-center justify-center w-6 h-6 rounded border border-accent text-text-secondary hover:bg-accent'>
        <ArrowSmallLeftIcon className='h-4 w-4' />
      </button>
      <span className='text-text-secondary'>This week</span>
      <button className='flex items-center justify-center w-6 h-6 rounded border border-accent text-text-secondary hover:bg-accent'>
        <ArrowSmallRightIcon className='h-4 w-4' />
      </button>
    </div>
  );
};

export default SubjectOverviewPagination;