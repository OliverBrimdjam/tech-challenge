import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryList from './CategoryList';

describe('CategoryList Component', () => {
  const mockCategories = ['Electronics', 'Books', 'Clothing'];

  it('renders all categories as buttons', () => {
    render(<CategoryList categories={mockCategories} />);
    
    const heading = screen.getByRole('heading', { name: /categories/i });
    expect(heading).toBeInTheDocument();

    const section = screen.getByRole('region', { name: /categories/i });
    expect(section).toBeInTheDocument();

    mockCategories.forEach(category => {
      const button = screen.getByRole('button', { name: category });
      expect(button).toBeInTheDocument();
    });
  });
});
