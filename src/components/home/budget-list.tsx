'use client';
import React from 'react';
import Food from '@/components/icons/food';
import useFetch from '@/lib/hooks/useFetch';
import { Alert } from '@nextui-org/alert';
import { Expense } from '@/lib/definitions';
import DataLoader from '../data-loader';
import EmptyList from '../empty-list';

const BudgetList: React.FC = () => {
  const {
    data: expenses,
    isLoading,
    isError,
  } = useFetch<Expense[]>('/api/expenses');
  console.log({ expenses, isLoading, isError });
  return (
    <section className="w-full lg:w-[34.5rem] lg:flex-1">
      <div className="w-full min-h-full  ">
        <div className="flex justify-between mb-7">
          <div className="text-primary font-normal capitalize text-xl">
            description
          </div>
          <div className="p-0.5"> Amount</div>
        </div>
        {isError && (
          <div className="flex items-center justify-center w-full my-2">
            <Alert color="danger" title="Cannot Load Expenses" />
          </div>
        )}
        {isLoading && <DataLoader />}
        {expenses && (
          <section>
            {expenses.length !== 0 ? (
              <div className="overflow-x-auto ">
                <table className="w-full">
                  <thead className="sr-only">
                    <tr className="text-foreground">
                      <th>Expenses</th>

                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="w-full flex flex-col space-y-4 ">
                    {expenses.map((expense, i) => (
                      <tr key={i} className="flex justify-between">
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                              <div>
                                <Food />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{expense.name}</div>
                              {/* <div className="text-sm opacity-50">
                                <small>Date:</small>{' '}
                                <strong>{expense.createdAt}</strong>
                              </div> */}
                            </div>
                          </div>
                        </td>

                        <th className="ml-2">
                          <div className="text-3xl text-foreground text-right capitalize">
                            £{expense.amount}
                          </div>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyList title="expenses" />
            )}
          </section>
        )}
      </div>
    </section>
  );
};

export default BudgetList;
