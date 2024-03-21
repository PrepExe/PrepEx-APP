import Link from 'next/link';
import { useRouter } from 'next/router';

type SidebarItemProps = {
  name: string;
  href: string;
  icon: any;
};

const SidebarItem = (props: SidebarItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === props.href || (props.href !== '/app' && router.pathname.startsWith(props.href));

  return (
    <li>
      <Link href={props.href} className={`flex items-center p-2.5 text-base rounded-lg ${isActive ? 'bg-accent font-medium' : 'hover:bg-accent'}`}>
        <span className='flex gap-2'>
          {props.icon} {props.name}
        </span>
      </Link>
    </li>
  );
};

export default SidebarItem;