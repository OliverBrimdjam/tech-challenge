'use client'

import { TProduct } from "@/@types/TProduct";
import React, { useState, useEffect, useContext, createContext } from "react";

type TProductContextType = {
  products: TProduct[];
  setCategory: (category: string | null) => void;
  setIsOrdered: () => void;
  isOrdered: boolean;
}

type TProductProviderProps = { children: React.ReactNode; startProducts: TProduct[] }

const ProductContext = createContext<TProductContextType>({ 
  products: [], 
  setCategory: () => {}, 
  setIsOrdered: () => {},
  isOrdered: false 
});

export function ProductProvider ({ children, startProducts }: TProductProviderProps) {
  const [products, setProducts] = useState<TProduct[]>(startProducts);
  const [category, setCategory] = useState<string | null>(null);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  const fetchProducts = async function (category: string | null) {
    const response = await fetch(
      category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products'
    );
    const data = await response.json();
    setProducts(isOrdered ? sortProductsByPrice(data) : data);
  }

  const sortProductsByPrice = (products: TProduct[]) => {
    return [...products].sort((a, b) => a.price - b.price);
  }

  const toggleOrder = () => {
    setIsOrdered(prev => !prev);
    setProducts(prev => !isOrdered ? sortProductsByPrice(prev) : [...prev].sort((a, b) => a.id - b.id));
    console.log('click')
  }

  useEffect(() => {
    fetchProducts(category);
  },[category]);

  return (
    <ProductContext.Provider value={{ 
      products, 
      setCategory, 
      setIsOrdered: toggleOrder,
      isOrdered 
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);