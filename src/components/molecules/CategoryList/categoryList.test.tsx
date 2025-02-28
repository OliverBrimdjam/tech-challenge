import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryList from './CategoryList';

describe('CategoryList Component', () => {
  const mockCategories = ['Electronics', 'Books', 'Clothing'];

  it('renders all categories as buttons', () => {
    render(<CategoryList categories={mockCategories} />);
    
    // Verifica se o título está presente
    const heading = screen.getByRole('heading', { name: /categories/i });
    expect(heading).toBeInTheDocument();

    // Verifica se a section tem o aria-label correto
    const section = screen.getByRole('region', { name: /categories/i });
    expect(section).toBeInTheDocument();

    // Verifica se todos os botões das categorias foram renderizados
    mockCategories.forEach(category => {
      const button = screen.getByRole('button', { name: category });
      expect(button).toBeInTheDocument();
    });
  });

  it('renders correct number of buttons', () => {
    render(<CategoryList categories={mockCategories} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockCategories.length);
  });
});
