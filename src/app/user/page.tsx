import React from 'react';
import { expenses } from '@/data/expenses';
import BudgetList from '@/components/home/budget-list';
import BudgetSummary from '@/components/home/budget-summary';
import BudgetOptional from '@/components/home/budget-optional';

const UserPage = () => {
  return (
    <div className="w-full flex gap-10 flex-col-reverse lg:flex-row">
      <section className="w-full lg:w-[34.5rem] lg:flex-1">
        <BudgetList expenses={expenses} />
      </section>
      <section className="flex gap-10 flex-col sm:flex-row  ">
        <BudgetSummary />
        <BudgetOptional />
      </section>
    </div>
  );
};

export default UserPage;
