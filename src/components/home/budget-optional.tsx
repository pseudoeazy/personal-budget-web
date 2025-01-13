import React from 'react';
import AmazonIcon from '@/components/icons/amazon';
import GoogleIcon from '@/components/icons/google';
import NetflixIcon from '@/components/icons/netflix';
import SpotifyIcon from '@/components/icons/spotify';
import FacebookIcon from '@/components/icons/facebook';

const optionalListItems = [
  {
    name: 'netflix',
    icon: NetflixIcon,
  },
  {
    name: 'spotify',
    icon: SpotifyIcon,
  },
  {
    name: 'amazon',
    icon: AmazonIcon,
  },
  {
    name: 'google',
    icon: GoogleIcon,
  },
  {
    name: 'facebook',
    icon: FacebookIcon,
  },
];

const BudgetOptional = () => {
  return (
    <div className="flex flex-col space-y-5  w-full sm:w-[22rem]  px-7 pb-7 bg-gray-100 text-background">
      <h3 className="capitalize text-background text-2xl leading-normal text-center border-b-2 py-[0.8rem] border-['#B2B2B2']">
        Optionals
      </h3>
      <div className="flex flex-col p-4 bg-foreground ">
        <div className="mb-7 text-center text-xs font-extrabold uppercase tracking-wider text-black">
          <strong>choose any fix expenses</strong>
        </div>
        <div className="flex flex-col space-y-10">
          {optionalListItems.map((item, i) => (
            <div key={i} className="flex justify-between items-center ">
              <div className="flex space-x-1 items-center">
                <span className="border border-secondary rounded-full">
                  {<item.icon />}
                </span>
                <span className="text-sm uppercase font-normal leading-normal tracking-wider">
                  {item.name}
                </span>
              </div>
              <button
                value={item.name}
                type="button"
                className="flex justify-center items-center px-[0.82rem] rounded-2xl text-sm text-black bg-secondary text-center font-semibold"
              >
                select
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-0.5 pt-1 border-t-2 border-['#B2B2B2'] text-black">
        <span className="text-center capitalize font-normal leading-normal">
          Goals
        </span>
        <div className="pl-2 border-l-2 border-secondary text-xs font-bold leading-normal">
          Save 10% of this amount entered this month from my salary
        </div>
      </div>
    </div>
  );
};

export default BudgetOptional;
