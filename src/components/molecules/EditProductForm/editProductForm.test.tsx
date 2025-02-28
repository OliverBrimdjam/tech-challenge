import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditProductForm } from './EditProductForm';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

global.fetch = jest.fn();

describe('EditProductForm', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'test',
    image: 'https://fakestoreapi.com/img/test.jpg',
    rating: { rate: 4.5, count: 10 }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders edit button and opens dialog with pre-filled values', () => {
    render(<EditProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit product/i }));
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProduct.price.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProduct.description)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<EditProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit product/i }));
    
    const titleInput = screen.getByDisplayValue(mockProduct.title);
    fireEvent.change(titleInput, { target: { value: 'ab' } });
    
    fireEvent.click(screen.getByRole('button', { name: /update product/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Title must be at least 3 characters')).toBeInTheDocument();
    });
  });

  it('handles successful product update', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    
    render(<EditProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit product/i }));
    
    const titleInput = screen.getByDisplayValue(mockProduct.title);
    fireEvent.change(titleInput, { target: { value: 'Updated Product Title' } });
    
    fireEvent.click(screen.getByRole('button', { name: /update product/i }));
    
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Product updated successfully!');
    });
  });

  it('handles failed product update', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to update'));
    
    render(<EditProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit product/i }));
    fireEvent.click(screen.getByRole('button', { name: /update product/i }));
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to update product');
    });
  });

  it('category field should be disabled', () => {
    render(<EditProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit product/i }));
    
    const categoryInput = screen.getByDisplayValue(mockProduct.category);
    expect(categoryInput).toBeDisabled();
  });
});
