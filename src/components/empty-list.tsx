import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import { NewExpense } from './create-expense';
import { NewIncome } from './create-income';

interface Props {
  title: string;
}
const EmptyList: React.FC<Props> = ({ title }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  return (
    <div className="mt-32">
      <h3 className="mb-12 text-2xl text-center text-foreground leading-normal capitalize font-bold">
        Looks like you haven&apos;t added any{' '}
        <span className="text-secondary">{title} yet.</span>
      </h3>
      <p className="mb-8 text-center text-foreground ">
        No worries, just hit the{' '}
        <Button className="text-secondary" onPress={onOpen}>
          &apos;Add&apos;
        </Button>
        {title === 'expenses' && (
          <NewExpense
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
          />
        )}
        {title === 'incomes' && (
          <NewIncome
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
          />
        )}
        button to get started
      </p>
      <div className="flex justify-center">
        <ShoppingCart className="w-20 h-20" />
      </div>
    </div>
  );
};

export default EmptyList;
