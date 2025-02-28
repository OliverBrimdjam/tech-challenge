'use client'

import { TPaginatedData } from "@/@types/TPaginatedData";
import getAllProductsOrByCategory from "@/services/apiFetchService";
import React, { useState, useEffect, useContext, createContext } from "react";

type TProductContextType = {
  products: TPaginatedData;
  setCategory: (category: string | null) => void;
  toggleOrder: () => void;
  isOrdered: boolean;
  setCurrentPage: (page: number) => void;
}

type TProductProviderProps = { children: React.ReactNode; startProducts: TPaginatedData }

const ProductContext = createContext<TProductContextType>({ 
  products: {
    data: [],
    total: 0,
    current_page: 1,
    per_page: 0,
    total_pages: 0
  }, 
  setCategory: () => {}, 
  toggleOrder: () => {},
  isOrdered: false,
  setCurrentPage: () => {}
});

export function ProductProvider ({ children, startProducts }: TProductProviderProps) {
  const [products, setProducts] = useState<TPaginatedData>(startProducts);
  const [category, setCategory] = useState<string | null>(null);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async function (page: number, per_page: number, category: string | null, ) {
    const pageData: TPaginatedData = await getAllProductsOrByCategory(page, per_page, category)

    setProducts(isOrdered ? sortProductsByPrice(pageData) : pageData);
  }

  const sortProductsByPrice = (pageData: TPaginatedData) => {
    return {
      ...pageData,
      data: [...pageData.data].sort((a, b) => a.price - b.price)
    };
  }

  const toggleOrder = () => {
    setIsOrdered(prevIsOrdered => !prevIsOrdered);
    setProducts(prevProductsList => !isOrdered 
      ? sortProductsByPrice(prevProductsList) 
      : {
          ...prevProductsList,
          data: [...prevProductsList.data].sort((a, b) => a.id - b.id)
        }
    );
  }

  useEffect(() => {
    fetchProducts(currentPage, 6, category);
  }, [category, currentPage]);

  return (
    <ProductContext.Provider value={{ 
      products, 
      setCategory, 
      toggleOrder,
      isOrdered,
      setCurrentPage 
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);