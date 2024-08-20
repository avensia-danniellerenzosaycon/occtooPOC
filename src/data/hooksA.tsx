import { useState, useEffect } from 'react';
import { IProduct, getProducts } from '../core/models/indexA';

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProducts = async (filters?: Record<string, string>) => {
    setIsLoading(true);
    try {
      const response = await getProducts(filters);
      setProducts(response.results);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, fetchProducts };
};