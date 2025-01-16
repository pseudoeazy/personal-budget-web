'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<boolean>;
}

function Sidebar({ sidebarOpen, setSidebarOpen, children }: Props) {
  const sidebar = useRef<HTMLDivElement | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  /* close on click outside */
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, sidebar, trigger, setSidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.keyCode !== 27) return; // 27 is the keyCode for Escape
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <div className="lg:w-48">
      {/* Sidebar backdrop (mobile only) 48  bg-opacity-30 bg-background opacity-50 s*/}
      <div
        className={clsx({
          'fixed inset-0  z-40 lg:hidden lg:z-auto transition-opacity duration-200':
            true,
          'opacity-100': sidebarOpen,
          'opacity-0 pointer-events-none': !sidebarOpen,
        })}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={clsx({
          'absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-full overflow-y-scroll lg:overflow-y-auto no-scrollbar w-48 flex-shrink-0 bg-background p-4 transition-transform duration-200 ease-in-out':
            true,
          'translate-x-0': sidebarOpen,
          '-translate-x-48': !sidebarOpen,
        })}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2 ">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <ArrowLeft />
          </button>
          {/* Logo */}
          <Link href="/user" className="block">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={110}
              height={71}
              className="w-full"
              priority
            />
          </Link>
        </div>

        {/* Links */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Sidebar;
