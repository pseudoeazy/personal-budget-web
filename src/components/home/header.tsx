'use client';
import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@nextui-org/button';

const Header = () => {
  const { status } = useSession();
  return (
    <header className="bg-neutral p-4">
      <div className="container flex-col md:flex-row mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">MonthlyBudget</h1>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="#features" className="hover:text-secondary">
                Features
              </Link>
            </li>
            <li>
              <Link href="#dashboard" className="hover:text-secondary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-secondary">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-secondary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex space-x-2">
          {status !== 'authenticated' && (
            <Button
              onPress={() => signIn('Credentials', { callbackUrl: '/user' })}
              className="bg-secondary text-neutral py-3 px-6 rounded shadow-md hover:bg-yellow-500"
            >
              Sign In
            </Button>
          )}
          {status === 'authenticated' ? (
            <Link
              href="/user"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/register"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
