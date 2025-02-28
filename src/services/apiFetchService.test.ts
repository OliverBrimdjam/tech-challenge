import getAllProductsOrByCategory from './apiFetchService';

describe('apiFetchService', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 99.99,
      description: 'Test description 1',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/test1.jpg',
      rating: { rate: 4.5, count: 10 }
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 149.99,
      description: 'Test description 2',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/test2.jpg',
      rating: { rate: 3.5, count: 8 }
    }
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('getAllProductsOrByCategory', () => {
    it('fetches all products successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      });

      const result = await getAllProductsOrByCategory();
      
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.current_page).toBe(1);
      expect(result.per_page).toBe(6);
    });

    it('fetches products by category', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      });

      const result = await getAllProductsOrByCategory(1, 6, 'electronics');
      
      expect(global.fetch).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/category/electronics'
      );
      expect(result.data).toHaveLength(2);
    });

    it('handles pagination correctly', async () => {
      const manyProducts = Array(10).fill(null).map((_, i) => ({
        ...mockProducts[0],
        id: i + 1
      }));

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(manyProducts)
      });

      const result = await getAllProductsOrByCategory(2, 3);
      
      expect(result.data).toHaveLength(3);
      expect(result.current_page).toBe(2);
      expect(result.total_pages).toBe(4);
    });
  });
});
