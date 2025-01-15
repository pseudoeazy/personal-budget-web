import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface Props {
  title: string;
  path: string;
}
const EmptyList: React.FC<Props> = ({ title, path }) => {
  return (
    <div className="mt-32">
      <h3 className="mb-12 text-4xl text-center text-foreground leading-normal capitalize font-bold">
        Looks like you haven&apos;t added any{' '}
        <span className="text-secondary">{title} yet.</span>
      </h3>
      <p className="mb-8 text-center text-foreground ">
        No worries, just hit the{' '}
        <Link href={path} className="text-secondary">
          &apos;Add&apos;
        </Link>{' '}
        button to get started
      </p>
      <div className="flex justify-center">
        <ShoppingCart className="w-20 h-20" />
      </div>
    </div>
  );
};

export default EmptyList;
