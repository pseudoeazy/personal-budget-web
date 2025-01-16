import { redirect } from 'next/navigation';
import VerifyUser from './verify-user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { verifyEmailSchema } from '@/lib/validationSchemas';

type Props = {
  searchParams: { t: string; e: string };
};

const VerifyPage = async ({ searchParams }: Props) => {
  const { t, e } = await searchParams;
  const token = t;
  const email = atob(e);

  const validate = verifyEmailSchema.safeParse({ token, email });
  if (!validate.success) {
    return redirect('/');
  }
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/user');
  }

  return (
    <div>
      <VerifyUser token={token} email={email} />
    </div>
  );
};

export default VerifyPage;
