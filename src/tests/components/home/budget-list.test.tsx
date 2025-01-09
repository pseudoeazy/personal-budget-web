import BudgetList from '@/components/home/budget-list';
import { render, screen } from '@testing-library/react';
import { expenses } from '@/data/expenses';

describe('BudgetList', () => {
  it('should render the add button if expenses array is empty', () => {
    render(<BudgetList expenses={[]} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/add/i);
  });

  it('should render the list of expenses passed', () => {
    render(<BudgetList expenses={expenses} />);

    expenses.forEach((expense) => {
      expect(screen.getByText(expense.name)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(expense.amount))).toBeInTheDocument();
    });
  });
});
