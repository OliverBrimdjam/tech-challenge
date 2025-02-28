'use client'

import Button from "@/components/atoms/Button/Button";
import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "@/contexts/ProductContext";
import Pagination from "@/components/atoms/Pagination/Pagination";

export default function ProductsList() {
  const { products, toggleOrder, setCurrentPage } = useProducts();

  return (
    <section aria-labelledby="products-list">
      <div className="flex justify-between flex-wrap">
        <h2 id="products-list" className="text-3xl m-2">Product List</h2>
        <Button className="my-auto mx-6" onClick={toggleOrder}>Order By Price</Button>
      </div>
      <div className="flex-1 flex flex-wrap">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center my-4">
        <Pagination 
          currentPage={products.current_page}
          totalPages={products.total_pages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  )
}