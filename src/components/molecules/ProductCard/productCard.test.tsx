import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { JSX, ClassAttributes, ImgHTMLAttributes } from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'test category',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 10 }
  };

  const mockProductLowRating = {
    ...mockProduct,
    rating: { rate: 3.5, count: 10 }
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.rating.rate.toString())).toBeInTheDocument();
    expect(screen.getByAltText('Product photo')).toBeInTheDocument();
  });

  it('shows "Top Rated" badge for products with rating >= 4.5', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Top Rated')).toBeInTheDocument();
  });

  it('does not show "Top Rated" badge for products with rating < 4.5', () => {
    render(<ProductCard product={mockProductLowRating} />);
    expect(screen.queryByText('Top Rated')).not.toBeInTheDocument();
  });

  it('does not apply top rated styling for low rated products', () => {
    const { container } = render(<ProductCard product={mockProductLowRating} />);
    expect(container.firstChild).not.toHaveClass('border-4', 'border-amber-200');
  });

  it('renders product image with correct attributes', () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText('Product photo');
    
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveClass('rounded', 'm-auto', 'object-contain');
  });

  it('renders product link with correct href', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    
    expect(link).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });
});
