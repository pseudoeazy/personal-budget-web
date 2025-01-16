'use client';
import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Button } from '@nextui-org/button';
import { Alert } from '@nextui-org/alert';
import useFetch from '@/lib/hooks/useFetch';
import { PaginatedExpense } from '@/lib/definitions';
import DataLoader from '../data-loader';
import EmptyList from '../empty-list';
import CategoryIcon from '../categoryIcon';
import {
  capitalize,
  formatToLocalCurrency,
  getCategoryInfo,
} from '@/lib/utils';

const BudgetList: React.FC = () => {
  const { data, isLoading, isError } = useFetch<PaginatedExpense>(
    '/api/expenses?page=1&limit=5'
  );

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
        {data && (
          <section>
            {data?.expenses.length !== 0 ? (
              <div className="overflow-x-auto ">
                <table className="w-full">
                  <thead className="sr-only">
                    <tr className="text-foreground">
                      <th>Expenses</th>

                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="w-full flex flex-col space-y-4 ">
                    {data?.expenses.map((expense, i) => (
                      <tr key={i} className="flex justify-between">
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                              <div>
                                {
                                  <CategoryIcon
                                    icon={
                                      getCategoryInfo(expense.categoryId).icon
                                    }
                                  />
                                }
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {capitalize(expense.name)}
                              </div>
                              <div className="text-sm opacity-50">
                                {/* <small>Date:</small> */}
                                <strong>
                                  {format(
                                    parseISO(expense.createdAt),
                                    'MMMM, dd-yyyy'
                                  )}
                                </strong>
                              </div>
                            </div>
                          </div>
                        </td>

                        <th className="ml-2">
                          <div className="text-3xl text-foreground text-right capitalize">
                            {formatToLocalCurrency(expense.amount)}
                          </div>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="py-4">
                  <Button
                    radius="sm"
                    className="w-full flex items-center justify-center py-2 px-15 rounded text-center text-xl text-background bg-primary capitalize  font-normal "
                  >
                    <Link href="/user/expenses">See More</Link>
                  </Button>
                </div>
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
