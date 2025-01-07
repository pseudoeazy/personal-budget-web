import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('should render Header message', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /calculate smarter/i });
    expect(heading).toBeInTheDocument();
  });
});
