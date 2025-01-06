import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center bg-foreground  px-4 py-30px">
      <div className="flex space-x-1 text-background">
        <span>Copyright &copy; {new Date().getFullYear()}</span>
        <Link
          href="/terms"
          className="font-semibold transition-colors duration-200 ease-in-out hover:text-red-700"
        >
          P-Budget
        </Link>
        <span>All rights reserved</span>
      </div>

      <div className="items-center hidden lg:flex">
        <a href="#" className="" target="_blank" rel="noreferrer">
          <span className="sr-only">Facebook</span>
          FB-Icon
        </a>
      </div>
    </footer>
  );
};

export default Footer;
