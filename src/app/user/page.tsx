import React from 'react';
import BudgetSummary from '@/components/home/budget-summary';
import BudgetOptional from '@/components/home/budget-optional';
import BudgetList from '@/components/home/budget-list';

const UserPage = () => {
  return (
    <div className="w-full flex gap-10 flex-col-reverse lg:flex-row">
      <BudgetList />
      <section className="flex gap-10 flex-col sm:flex-row  ">
        <BudgetSummary />
        <BudgetOptional />
      </section>
    </div>
  );
};

export default UserPage;
