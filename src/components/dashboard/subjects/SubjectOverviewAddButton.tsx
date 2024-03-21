import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const SubjectOverviewAdd = () => {
  return (
    <Link href='app/study' className='flex flex-col items-center justify-center h-32 w-full p-8 rounded-lg bg-primary border border-accent hover:bg-accent hover:cursor-pointer'>
      <p className='text-text-secondary '><PlusIcon className='w-6 h-6' /></p>
    </Link>
  );
};

export default SubjectOverviewAdd;