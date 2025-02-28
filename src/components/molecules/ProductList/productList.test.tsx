import { render, screen, fireEvent } from '@testing-library/react';
import ProductsList from './ProductList';
import { useProducts } from '../../../contexts/ProductContext';

jest.mock('../../../contexts/ProductContext', () => ({
  useProducts: jest.fn()
}));

describe('ProductsList', () => {
  const mockProducts = {
    data: [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        description: 'Test description 1',
        category: 'test',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 4.5, count: 10 }
      },
      {
        id: 2,
        title: 'Test Product 2',
        price: 149.99,
        description: 'Test description 2',
        category: 'test',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.5, count: 8 }
      }
    ],
    total: 2,
    current_page: 1,
    per_page: 6,
    total_pages: 1
  };

  const mockToggleOrder = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      toggleOrder: mockToggleOrder
    });
  });

  it('renders product list with correct title', () => {
    render(<ProductsList />);
    expect(screen.getByText('Product List')).toBeInTheDocument();
  });

  it('renders all products from context', () => {
    render(<ProductsList />);
    
    mockProducts.data.forEach(product => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`R$ ${product.price}`)).toBeInTheDocument();
    });
  });

  it('renders order by price button', () => {
    render(<ProductsList />);
    
    const orderButton = screen.getByRole('button', { name: /order by price/i });
    expect(orderButton).toBeInTheDocument();
  });

  it('calls toggleOrder when order button is clicked', () => {
    render(<ProductsList />);
    
    const orderButton = screen.getByRole('button', { name: /order by price/i });
    fireEvent.click(orderButton);
    
    expect(mockToggleOrder).toHaveBeenCalled();
  });

  it('renders add product button', () => {
    render(<ProductsList />);
    
    const addButton = screen.getByRole('button', { name: /add product/i });
    expect(addButton).toBeInTheDocument();
  });

  it('renders correct number of products', () => {
    render(<ProductsList />);
    
    const products = screen.getAllByRole('link');
    expect(products).toHaveLength(mockProducts.data.length);
  });
});
