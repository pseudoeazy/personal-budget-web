import CreateExpense from '@/components/create-expense';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CreateExpense', () => {
  const renderCreateExpense = () => {
    render(<CreateExpense />);

    const button = screen.getByRole('button', { name: /new expense/i });
    const user = userEvent.setup();

    return {
      button,
      user,
    };
  };

  it('should render create expense popup', async () => {
    const { user, button } = renderCreateExpense();
    await user.click(button);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('open');
  });

  it('should close create expense popup if close button is clicked', async () => {
    const { user, button } = renderCreateExpense();
    await user.click(button);

    const closeBtn = screen.getByRole('button', { name: /close/i });
    await user.click(closeBtn);

    expect(screen.getByTestId('new_expense')).not.toHaveAttribute('open');
  });
});
