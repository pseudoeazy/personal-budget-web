import React, { PropsWithChildren } from 'react';
import Footer from './footer';
import LayoutContent from './layout-content';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const UserPageLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/api/auth/signin');
  }

  return (
    <div className="dashboard-page-layout">
      <LayoutContent>{children}</LayoutContent>
      <Footer />
    </div>
  );
};

export default UserPageLayout;
