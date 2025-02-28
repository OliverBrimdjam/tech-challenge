import Home from "./page";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Home Page (products page): ', () => {
  it('renders correctly: ', () => {
    render(<Home />);
    const header = screen.getByRole('banner');
    const footer = screen.getByRole('contentinfo');
    const main = screen.getByRole('main');
    const section = screen.getByRole('region', { name: /Products List/i });
    const section2 = screen.getByRole('region', { name: /Categories/i });

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(section2).toBeInTheDocument();
  });
});