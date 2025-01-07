import BudgetList from '@/components/home/budget-list';
import React from 'react';
import { expenses } from '@/data/expenses';

const UserPage = () => {
  return (
    <div className="w-full flex gap-10 flex-col-reverse lg:flex-row">
      <section className="w-full lg:w-[34.5rem] h-screen ">
        <BudgetList expenses={expenses} />
      </section>
      <section className="flex-1 flex gap-10 flex-col sm:flex-row min-h-screen ">
        <div className="w-full sm:w-[22rem] flex-1 min-h-screen  bg-foreground text-background">
          2
        </div>
        <div className="w-full sm:w-[22rem] flex-1 min-h-screen bg-foreground  text-background">
          3
        </div>
      </section>
    </div>
  );
};

export default UserPage;
