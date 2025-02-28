import { TProduct } from "@/@types/TProduct";

export default function nameTrimmer(products: TProduct[]) {
  return products.map(product => ({
    ...product,
    title: product.title.length > 30 
      ? product.title.slice(0, 27) + '...' 
      : product.title
  }));
}
