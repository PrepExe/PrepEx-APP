import SubjectUnitItem from './SubjectUnitItem';

const SubjectUnits = () => {
  return (
    <div className='bg-primary border border-accent rounded-lg p-4 w-full'>
      <h1 className='font-semibold mb-4'>Units</h1>
      <div className='grid grid-cols-5 grid-flow-row gap-6'>
        {[...Array(6)].map((x, i) => (
          <SubjectUnitItem key={i} index={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default SubjectUnits;