import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Food from '@/assets/icons/food';
import { Expense } from '@/types/expense';

interface Props {
  expenses: Expense[];
}
const BudgetList: React.FC<Props> = ({ expenses }) => {
  return (
    <div className="w-full min-h-full  ">
      <div className="flex justify-between mb-7">
        <div className="text-primary font-normal capitalize text-xl">
          description
        </div>
        <div className="border border-primary p-0.5"> Filter Expenses</div>
      </div>
      <section>
        {expenses.length !== 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-foreground">
                  <th>Name</th>

                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle ">
                            <Food />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{expense.name}</div>
                          <div className="text-sm opacity-50">
                            <small>Date:</small>{' '}
                            <strong>{expense.createdAt}</strong>
                          </div>
                        </div>
                      </div>
                    </td>

                    <th>
                      <div className="text-3xl text-foreground text-right capitalize">
                        ${expense.amount}
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-32">
            <h3 className="mb-12 text-4xl text-center text-foreground leading-normal capitalize font-bold">
              Looks like you haven&apos;t added any{' '}
              <span className="text-secondary">expenses yet.</span>
            </h3>
            <p className="mb-8 text-center text-foreground ">
              No worries, just hit the{' '}
              <button type="button" className="text-secondary">
                &apos;Add&apos;
              </button>{' '}
              button to get started
            </p>
            <div className="flex justify-center">
              <ShoppingCart className="w-20 h-20" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default BudgetList;
