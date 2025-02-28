import { TProduct } from '@/@types/TProduct';
import nameTrimmer from './nameTrimmer';

describe('nameTrimmer', () => {
  it('should trim product titles longer than 50 characters', () => {
    const products = [{
      id: 1,
      title: 'This is a very long product title that should definitely be trimmed because it is too long',
      price: 99.99,
      description: 'Test description',
      category: 'test',
      image: 'test.jpg',
      rating: { rate: 4.5, count: 10 }
    }];

    const trimmedProducts = nameTrimmer(products);
    expect(trimmedProducts[0].title).toBe('This is a very long product...');
    expect(trimmedProducts[0].title.length).toBeLessThanOrEqual(50);
  });

  it('should not trim product titles shorter than 50 characters', () => {
    const products = [{
      id: 1,
      title: 'Short title',
      price: 99.99,
      description: 'Test description',
      category: 'test',
      image: 'test.jpg',
      rating: { rate: 4.5, count: 10 }
    }];

    const trimmedProducts = nameTrimmer(products);
    expect(trimmedProducts[0].title).toBe('Short title');
  });

  it('should handle empty array', () => {
    const products: TProduct[] = [];
    const trimmedProducts = nameTrimmer(products);
    expect(trimmedProducts).toEqual([]);
  });
});
