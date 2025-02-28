import { TProduct } from "@/@types/TProduct";
import ProductCard from "../ProductCard/ProductCard";

type TProductListProps = {
  products: TProduct[]
}

export default function ProductsList({products}: TProductListProps) {

  return (
    <section aria-labelledby="products-list">
      <h2 id="products-list">Products List</h2>
      <div className="flex-1 bg-blue-400 flex flex-wrap ">{products.map((product) => {
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