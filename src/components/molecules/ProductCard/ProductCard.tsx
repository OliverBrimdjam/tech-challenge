import { TProduct } from "@/@types/TProduct";

type TProductCardProp = {
  product: TProduct
}

export default function ProductCard({product}: TProductCardProp) {
  return (
    <div className="m-2 p-2 flex flex-col bg-yellow-700" key={product.id}>
      <span className="m-1">{product.title}</span>
      <span className="m-1">{product.price}</span>
    </div>
  )
}
