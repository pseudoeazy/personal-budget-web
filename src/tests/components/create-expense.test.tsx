import CreateExpense from '@/components/create-expense';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CreateExpense', () => {
  const renderCreateExpense = (isMobile = false) => {
    render(<CreateExpense isMobile={isMobile} />);
    let button: HTMLElement;

    if (isMobile) {
      button = screen.getByTestId('mobile_new_expense');
    } else {
      button = screen.getByRole('button', { name: /new expense/i });
    }
    const user = userEvent.setup();

    return {
      button,
      user,
      getPopup: () => screen.getByTestId('new_expense'),
    };
  };

  it('should render create expense popup for Desktop', async () => {
    const { user, button } = renderCreateExpense();
    await user.click(button);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('open');
  });

  it('should close create expense popup if close button is clicked for Desktop', async () => {
    const { user, button, getPopup } = renderCreateExpense();
    await user.click(button);

    const closeBtn = screen.getByRole('button', { name: /close/i });
    await user.click(closeBtn);

    expect(getPopup()).not.toHaveAttribute('open');
  });

  it('should render create expense popup for Mobile', async () => {
    const { user, button, getPopup } = renderCreateExpense(true);

    await user.click(button);
    const modal = getPopup();

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('open');
  });

  it('should close create expense popup if close button is clicked for Mobile', async () => {
    const { user, button, getPopup } = renderCreateExpense(true);
    await user.click(button);

    const closeBtn = screen.getByRole('button', { name: /close/i });
    await user.click(closeBtn);

    expect(getPopup()).not.toHaveAttribute('open');
  });
});
