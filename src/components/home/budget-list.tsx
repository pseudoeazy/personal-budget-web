import React from 'react';

const BudgetList = () => {
  return (
    <div className="w-full min-h-full border border-secondary">
      <div className="flex justify-between ">
        <div className="text-primary font-normal capitalize text-xl">
          description
        </div>
        <div className="border border-primary"> Filter Expenses</div>
      </div>
    </div>
  );
};

export default BudgetList;
