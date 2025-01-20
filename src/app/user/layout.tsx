import React, { PropsWithChildren } from 'react';
import Footer from '@/components/home/Footer';
import LayoutContent from './layout-content';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';

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
