'use client';
import Link from 'next/link';
import { BadgeDollarSign, House, PiggyBank, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const sidebarMenus = [
  {
    icon: <House />,
    label: 'dashboard',
    path: '/user',
  },
  {
    icon: <BadgeDollarSign />,
    label: 'expenses',
    path: '/user/expenses',
  },
  {
    icon: <PiggyBank />,
    label: 'income',
    path: '/user/income',
  },
  {
    icon: <Settings />,
    label: 'settings',
    path: '/user/settings',
  },
];

const UserMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="mt-3">
      {sidebarMenus.map((menu, i) => (
        <li
          key={i}
          className={clsx({
            'px-2 py-1 rounded-sm mb-0.5 last:mb-0': true,
            'bg-gray-900': pathname === menu.path,
          })}
        >
          <Link
            href={menu.path}
            className={clsx({
              'block p-1 text-gray-200 hover:text-secondary transition duration-150':
                true,
              'hover:text-gray-200': pathname === menu.path,
            })}
          >
            <div className="flex flex-grow">
              <span className="mr-4">{menu.icon}</span>
              <span className="text-sm font-openSans capitalize">
                {' '}
                {menu.label}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default UserMenu;
