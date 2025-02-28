import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductForm } from './ProductForm';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

global.fetch = jest.fn();

describe('ProductForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders add product button and opens dialog', () => {
    render(<ProductForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /add product/i }));
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Create New Product')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ProductForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /add product/i }));
    fireEvent.click(screen.getByRole('button', { name: /create product/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Title must be at least 3 characters')).toBeInTheDocument();
      expect(screen.getByText('Description must be at least 10 characters')).toBeInTheDocument();
    });
  });

  it('has default image URL', () => {
    render(<ProductForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /add product/i }));
    
    const imageInput = screen.getByLabelText(/image url/i);
    expect(imageInput).toHaveValue('https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg');
  });
});
