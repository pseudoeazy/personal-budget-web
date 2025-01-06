'use client';
import Link from 'next/link';
import { BadgeDollarSign } from 'lucide-react';

const sidebarMenus = [
  {
    icon: <BadgeDollarSign />,
    label: 'user',
    path: '/user',
  },
];

const UserMenu = () => {
  const pathname = '/user';

  return (
    <ul className="mt-3">
      {sidebarMenus.map((menu, i) => (
        <li
          key={i}
          className={`px-2 py-1 rounded-sm mb-0.5 last:mb-0 ${
            pathname === menu.path && 'bg-gray-900'
          }`}
        >
          <Link
            href={menu.path}
            className={`block p-1 text-gray-200 hover:text-white transition duration-150 ${
              pathname === menu.path && 'hover:text-gray-200'
            }`}
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
