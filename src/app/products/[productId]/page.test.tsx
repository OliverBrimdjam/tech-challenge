import { render, screen } from '@testing-library/react';
import ProductPage from './page';
import { getProductById } from '../../../services/apiFetchService';
import { JSX, ClassAttributes, ImgHTMLAttributes } from 'react';

jest.mock('../../../services/apiFetchService', () => ({
  getProductById: jest.fn()
}));

jest.mock('../../../components/molecules/EditProductForm/EditProductForm', () => ({
  EditProductForm: () => <div data-testid="edit-form">Edit Form</div>
}));

jest.mock('../../../components/molecules/DeleteProductForm/DeleteProductForm', () => ({
  DeleteProductForm: () => <div data-testid="delete-form">Delete Form</div>
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />
}));

describe('ProductPage', () => {
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
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);
  });

  it('renders product details correctly', async () => {
    render(await ProductPage({ params: { productId: '1' } }));

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(`rate: ${mockProduct.rating.rate}`)).toBeInTheDocument();
    expect(screen.getByText(`count: ${mockProduct.rating.count}`)).toBeInTheDocument();
  });

  it('renders product image with correct attributes', async () => {
    render(await ProductPage({ params: { productId: '1' } }));

    const image = screen.getByAltText(mockProduct.title);
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveClass('rounded-md', 'mx-auto', 'my-auto', 'object-contain');
  });

  it('renders edit and delete forms', async () => {
    render(await ProductPage({ params: { productId: '1' } }));

    expect(screen.getByTestId('edit-form')).toBeInTheDocument();
    expect(screen.getByTestId('delete-form')).toBeInTheDocument();
  });

  it('calls getProductById with correct id', async () => {
    await ProductPage({ params: { productId: '1' } });
    
    expect(getProductById).toHaveBeenCalledWith(1);
  });

  it('renders back button with correct link', async () => {
    render(await ProductPage({ params: { productId: '1' } }));
    
    const backLink = screen.getByRole('link');
    expect(backLink).toHaveAttribute('href', '/');
  });
});
