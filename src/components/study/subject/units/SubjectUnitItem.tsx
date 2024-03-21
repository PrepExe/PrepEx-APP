const SubjectUnitItem = (props: { index: number }) => {
  return (
    <div className='flex flex-col items-center justify-center h-40 min-w-max p-8 rounded-lg bg-primary border border-accent'>
      <h1 className='font-semibold'>Unit {props.index}</h1>
      <p>{props.index}.1 Example</p>
    </div>
  );
};

export default SubjectUnitItem;