'use client'

import { TProduct } from "@/@types/TProduct";
import React, { useState, useEffect, useContext, createContext } from "react";

type TProductContextType = {
  products: TProduct[];
  setCategory: (category: string | null) => void;
}

type TProductProviderProps = { children: React.ReactNode; startProducts: TProduct[] }

const ProductContext = createContext<TProductContextType>({ products: [], setCategory: () => {} });

export function ProductProvider ({ children, startProducts }: TProductProviderProps) {
  const [products, setProducts] = useState<TProduct[]>(startProducts);
  const [category, setCategory] = useState<string | null>(null);

  const fetchProducts = async function (category: string | null) {
    const response = await fetch(
      category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products'
    );
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts(category);
  },[category]);

  return (
    <ProductContext.Provider value={{ products, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);