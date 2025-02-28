import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteProductForm } from './DeleteProductForm';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

global.fetch = jest.fn();

describe('DeleteProductForm', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'test',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 10 }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders delete button and dialog correctly', () => {
    render(<DeleteProductForm product={mockProduct} />);
    
    expect(screen.getByRole('button', { name: /delete product/i })).toBeInTheDocument();
  });

  it('opens dialog when delete button is clicked', () => {
    render(<DeleteProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /delete product/i }));
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this product?')).toBeInTheDocument();
  });

  it('closes dialog when cancel button is clicked', () => {
    render(<DeleteProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /delete product/i }));
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('handles successful product deletion', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    
    render(<DeleteProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /delete product/i }));
    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/1',
        { method: 'DELETE' }
      );
      expect(toast.success).toHaveBeenCalledWith('Product deleted successfully!');
    });
  });

  it('handles failed product deletion', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete'));
    
    render(<DeleteProductForm product={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /delete product/i }));
    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }));
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to delete product');
    });
  });
});
