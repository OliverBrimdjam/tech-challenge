'use client'

import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

export default function ProductsList() {
  const {products} = useProducts();

  return (
    <section aria-labelledby="products-list">
      <h2 id="products-list" className=" text-3xl m-2">Product List</h2>
      <div className="flex-1 flex flex-wrap ">{products.map((product) => {
        return (
          <ProductCard key={product.id} product={product} />
        );
      }
      )}
      <button>order by price</button>
      </div>
    </section>
  )
}