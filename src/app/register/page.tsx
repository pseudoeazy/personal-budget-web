import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Signup from '@/components/forms/signup';
import HomeSVG from '@/components/home/home-svg';
import { authOptions } from '@/lib/authOptions';

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/user');
  }

  return (
    <div className="flex">
      <section className="hidden md:flex md:flex-col xl:flex-1 min-h-screen pt-40 bg-boxColorLight md:pr-8">
        <h1 className="md:pl-8 pl-12 text-[2.65rem] italic font-normal leading-normal capitalize text-black">
          Calculate smarter,
          <br /> spend wiser ...
        </h1>
        <HomeSVG />
      </section>
      <section className="flex-1 min-h-screen bg-mainDarkBase flex justify-center sm:pb-24">
        <div className="px-10 mb-20">
          <div className="flex flex-col items-center justify-center mt-12 text-center">
            <Link href="/" className="block">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={110}
                height={71}
                className="w-full"
              />
            </Link>
          </div>
          <h2 className="mb-8 text-center text-boxColorLight text-[3.75rem] font-normal leading-normal capitalize">
            monthly <span className="text-complOpt2">budget</span>
          </h2>
          <Signup />
        </div>
      </section>
    </div>
  );
}
