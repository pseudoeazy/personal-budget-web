import CreateExpense from '@/components/create-expense';
import { LogOut, CircleUser, BadgeDollarSign, Menu } from 'lucide-react';
import Link from 'next/link';

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<boolean>;
}

function Header({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <header className="sticky top-0  border-b border-foreground z-30 ">
      <div className="px-4 sm:px-6 lg:px-8 lg:pt-8">
        <div className="flex items-center justify-between  -mb-px py-4">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            {!sidebarOpen && (
              <button
                className="text-gray-500 hover:text-gray-600 lg:hidden"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu />
              </button>
            )}
            {/*-translate-x-8 */}
            <div className="flex">
              <span className="block">
                <BadgeDollarSign />
              </span>
              <div className=" flex flex-col">
                <span className="font-bold text-primary capitalize leading-normal">
                  Expenses
                </span>
                <Link href="/user/">
                  <h1 className="text-boxColorLight  ml-auto text-lg md:text-4xl font-normal leading-normal capitalize">
                    monthly <span className="text-complOpt2">budget</span>
                  </h1>
                </Link>
              </div>
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center gap-5 flex-col">
            <div className="flex gap-6">
              <CreateExpense isMobile={false} />
              <div className="flex justify-center items-center space-x-1">
                <CircleUser />
                <span className="text-sm">Welcome Alexander</span>
              </div>
            </div>
            <div className="border border-foreground self-end">
              <button
                className="flex items-center justify-center space-x-1 px-10"
                onClick={() => {
                  console.log('logged out');
                  // signOut({ callbackUrl: '/' })
                }}
              >
                <span className="text-sm">Sign Out</span>
                <LogOut />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
