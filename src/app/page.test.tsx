import Home from "./page";
import { render, screen } from '@testing-library/react';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<Home />);
    const component = screen.getByText('hello world!!');

    expect(component).toBeInTheDocument();
  });
});