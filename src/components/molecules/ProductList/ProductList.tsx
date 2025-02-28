'use client'

import Button from "@/components/atoms/Button/Button";
import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

export default function ProductsList() {
  const {products, setIsOrdered} = useProducts();

  return (
    <section aria-labelledby="products-list">
      <div className="flex justify-between">
        <h2 id="products-list" className=" text-3xl m-2">Product List</h2>
        <Button onClick={setIsOrdered}>Order By Price</Button>
      </div>
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