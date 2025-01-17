'use client';
import React from 'react';
import { Button } from '@nextui-org/button';
import { signIn } from 'next-auth/react';
import { Github, Facebook, Twitter } from 'lucide-react';
import Gmail from '@/components/icons/gmail';
import { Tooltip } from '@nextui-org/react';

const providers = [
  {
    name: 'github',
    icon: Github,
  },
  {
    name: 'google',
    icon: Gmail,
  },
  {
    name: 'facebook',
    icon: Facebook,
  },
  {
    name: 'twitter',
    icon: Twitter,
  },
];

const SocialLogins = () => {
  return (
    <section className="flex justify-around mb-8 w-full">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          onPress={() => signIn(provider.name, { callbackUrl: '/user' })}
        >
          <Tooltip content={provider.name}>{<provider.icon />}</Tooltip>
        </Button>
      ))}
    </section>
  );
};

export default SocialLogins;
