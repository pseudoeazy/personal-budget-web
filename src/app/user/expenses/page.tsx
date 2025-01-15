import React from 'react';
import ExpensesList from './ExpensesList';

const ExpensesPage = () => {
  return (
    <div className="min-h-screen flex md:gap-10 ">
      <ExpensesList />
    </div>
  );
};

export default ExpensesPage;
