import { TProduct } from "@/@types/TProduct";
import Image from "next/image";
import Link from "next/link";

type TProductCardProp = {
  product: TProduct
}

export default function ProductCard({product}: TProductCardProp) {
  const isTopRated = product.rating.rate >= 4.5 ? "border-4 border-amber-200" : null

  return (
    <Link href={`/products/${product.id}`}>
      <div className={`m-2 p-2 flex flex-col bg-white w-2xs rounded shadow-xl hover:scale-105 transition-transform ${isTopRated}`}>
        <div className="flex justify-end h-5">{isTopRated && <span className="text-yellow-400">Top Rated</span>}</div>
        <div className="h-6 flex flex-row justify-between">
          <span className="text-sm">{product.category}</span>
          <span className="text-sm">{product.rating.rate}</span>
        </div>
        <span className="m-1 h-16 text-lg overflow-hidden">{product.title}</span>
        <div className="relative h-[260px]">
          <Image
            className="rounded m-auto object-contain" 
            src={product.image} 
            fill
            alt="Product photo"
          />
        </div>
        <div className="flex justify-end">
          <span className="m-2 text-2xl">R$ {product.price}</span>
        </div>
      </div>
    </Link>
  )
}
