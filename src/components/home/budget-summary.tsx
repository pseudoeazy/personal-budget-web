import React from 'react';
import { Plus } from 'lucide-react';

const BudgetSummary = () => {
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
            £800,00
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" relative w-48 h-48  border-[10px] border-['#D2D2D2'] rounded-full"></div>
      </div>

      <div className="pt-10 border-t-2 border-['#B2B2B2']">
        <button
          style={{
            boxShadow: `0px 3.511px 10.534px 0px rgba(0, 0, 0, 0.04)`,
          }}
          type="button"
          className="w-full flex items-center justify-center py-2 px-15 rounded text-center text-xl text-background bg-primary capitalize  font-normal "
        >
          reset expenses
        </button>
      </div>

      <button className="absolute -bottom-6 -right-3 sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary">
        <Plus className="w-12 h-12" />
      </button>
    </div>
  );
};

export default BudgetSummary;
