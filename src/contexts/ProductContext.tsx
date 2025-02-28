'use client'

import { TProduct } from "@/@types/TProduct";
import React, { useState, useEffect, useContext, createContext } from "react";

type TProductContextType = {
  products: TProduct[];
  setCategory: (category: string | null) => void;
}

const ProductContext = createContext<TProductContextType>({ products: [], setCategory: () => {} });

export function ProductProvider ({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<TProduct[]>([]);
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