import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  return <div>SettingsPage : {session?.user?.name}</div>;
};

export default SettingsPage;
