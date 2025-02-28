import Home from "./page";
import { render, screen } from '@testing-library/react';

describe('Home Page (products page): ', () => {
  it('renders correctly: ', () => {
    render(<Home />);
    const header = screen.getByRole('header');
    const footer = screen.getByRole('footer');
    const main = screen.getByRole('main');
    const section = screen.getByRole('section');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(section).toBeInTheDocument();
  });
});