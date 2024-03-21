const EventList = () => {
  return (
    <aside className='w-full h-1/2 p-4 border rounded-lg border-accent bg-primary'>
      <h1 className='font-semibold'>Upcoming events</h1>
      <ul className='flex flex-col gap-2 mt-4'>
        <li className='flex gap-2'>
          <span className='font-medium'>Wed 25 Jan</span>
          <p>UPC</p>
        </li>
        <li className='flex gap-2'>
          <span className='font-medium'>Thu 26 Jan</span>
          <p>UPC</p>
        </li>
        <li className='flex gap-2'>
          <span className='font-medium'>Mon 30 Jan</span>
          <p>Internal Assessment</p>
        </li>
        <li className='flex gap-2'>
          <span className='font-medium'>Thu 2 Feb</span>
          <p>Results</p>
        </li>
      </ul>
    </aside>
  );
};

export default EventList;