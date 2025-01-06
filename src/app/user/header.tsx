import { LogOut, CircleUser, BadgeDollarSign } from 'lucide-react';

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<boolean>;
}

const MenuIcon = () => (
  <svg
    className="w-6 h-6 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="5" width="16" height="2" />
    <rect x="4" y="11" width="16" height="2" />
    <rect x="4" y="17" width="16" height="2" />
  </svg>
);

function Header({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <header className="sticky top-0  border-b border-foreground z-30 ">
      <div className="px-4 sm:px-6 lg:px-8 lg:pt-8">
        <div className="flex items-center justify-between h-16 -mb-px">
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
                <MenuIcon />
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
                <h1 className="text-boxColorLight  ml-auto text-4xl font-normal leading-normal capitalize">
                  monthly <span className="text-complOpt2">budget</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-5 ">
            {/*  Divider */}
            {/* <hr className="w-px h-6 bg-foreground mx-3" /> */}
            <button
              type="button"
              className="hidden sm:block px-10 text-xl text-background bg-primary capitalize  font-semibold"
            >
              {' '}
              new Expense
            </button>
            <div className="flex justify-center items-center space-x-1">
              <CircleUser />
              <span>Welcome Alexander</span>
            </div>
            <div className="border">
              <button
                className="flex space-x-1 font-primary px-10"
                onClick={() => {
                  console.log('logged out');
                  // signOut({ callbackUrl: '/' })
                }}
              >
                <span>Sign Out</span>
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
