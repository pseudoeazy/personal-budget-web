'use client';
import React, { useState, useEffect } from 'react';
import CreateExpense from '../create-expense';
import useFetch from '@/lib/hooks/useFetch';
import { formatToLocalCurrency } from '@/lib/utils';
import ResetExpenses from './reset-expenses';
import BugdgetGraph from './budget-graph';

type DataProps = {
  amount: number;
};
const BudgetSummary = () => {
  const { data } = useFetch<DataProps[]>('/api/expenses/total');
  const [totalExpenses, setTotalExpenses] = useState('0');

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const expensesSum = data.reduce((prev, cur) => {
        return prev + cur.amount;
      }, 0);
      setTotalExpenses(formatToLocalCurrency(expensesSum));
    }
  }, [data]);

  return (
    <div className="relative flex flex-col space-y-5  w-full sm:w-[22rem]   px-7 pb-7 bg-gray-100 text-background">
      <h3 className="capitalize text-background text-2xl leading-normal text-center border-b-2 py-[0.8rem] border-['#B2B2B2']">
        Calculation
      </h3>
      <div className="flex flex-col px-16 py-0.5 bg-foreground text-center">
        <span className="font-extrabold uppercase tracking-wider text-black">
          <strong>income</strong>
        </span>
        <span className="capitalize font-normal text-3xl text-background">
          £2,700.00
        </span>
      </div>
      <div className="flex justify-center">
        <BugdgetGraph />
      </div>

      <div className="flex space-x-1 text-center">
        <div className="flex flex-col bg-background flex-1 px-5 py-0.5 flex-shrink-0 rounded">
          <span className="text-foreground font-semibold uppercase leading-normal">
            available
          </span>
          <span className="text-secondary capitalize font-normal text-lg">
            £2,000.00
          </span>
        </div>
        <div className="flex flex-col bg-background flex-1 px-5 py-0.5 flex-shrink-0 rounded">
          <span className="text-foreground font-semibold uppercase leading-normal">
            spent
          </span>
          <span className="text-primary capitalize font-normal text-lg">
            {totalExpenses}
          </span>
        </div>
      </div>

      <div className="pt-10 border-t-2 border-['#B2B2B2']">
        <ResetExpenses />
      </div>

      <CreateExpense isMobile />
    </div>
  );
};

export default BudgetSummary;
