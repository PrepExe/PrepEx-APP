const SubjectItemSkeleton = () => {
  return (
    <div className='flex flex-col h-full w-full p-3 gap-1 rounded-lg bg-primary border border-accent'>
      <div className='flex gap-1 mb-1'>
        <p className='leading-relaxed w-5 h-5 animate-pulse bg-darker-accent rounded-sm'></p>
        <p className='leading-relaxed w-24 h-5 animate-pulse bg-darker-accent'></p>
      </div>
      <div className='flex flex-col gap-1.5'>
        <p className='leading-relaxed w-full h-5 animate-pulse bg-darker-accent'></p>
        <p className='leading-relaxed w-full h-5 animate-pulse bg-darker-accent'></p>
        <p className='leading-relaxed w-full h-5 animate-pulse bg-darker-accent'></p>
      </div>
      <div className='flex gap-4 mt-1'>
        <button className='leading-relaxed w-12 rounded-md h-8 animate-pulse bg-darker-accent'></button>
        <button className='leading-relaxed w-20 rounded-md h-8 animate-pulse bg-darker-accent'></button>
      </div>
    </div >
  );
};

export default SubjectItemSkeleton;