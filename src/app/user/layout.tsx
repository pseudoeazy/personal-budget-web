'use client';
import React, { PropsWithChildren, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import UserMenu from './user-menu';

const UserPageLayout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-page-layout">
      <div className="flex min-h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <UserMenu />
        </Sidebar>
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Page content*/}
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPageLayout;
