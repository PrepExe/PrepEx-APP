type PastPapersOverviewItemProps = {
  icon: string;
  name: string;
  progress: number;
  total: number;
};

const PastPaperOverviewItem = (props: PastPapersOverviewItemProps) => {
  return (
    <li className='py-1 px-2 rounded hover:bg-accent hover:cursor-pointer'>
      {props.icon} {props.name} ({props.progress}/{props.total})
    </li>
  );
};

export default PastPaperOverviewItem;