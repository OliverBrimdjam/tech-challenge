// import { TProduct } from "@/@types/TProduct";
import CategoryList from "@/components/molecules/CategoryList/CategoryList";
import ProductsList from "@/components/molecules/ProductList/ProductList";
import { ProductProvider } from "@/contexts/ProductContext";

export default async function Home() {
  const categories = await fetchCategories();
  // const products: TProduct[] = await fetchAllProducts();

  return (
    <ProductProvider>
      <header className="bg-amber-400 h-16">olá</header>
      <main className="flex flex-row bg-[#DDD8D9]">
        <CategoryList categories={categories} />
        <ProductsList />
      </main>
      <footer>footer</footer>
    </ProductProvider>
  );
}
// ----------------------------------------------------------------
async function fetchCategories() {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return response.json();
}

// async function fetchAllProducts() {
//   const response = await fetch('https://fakestoreapi.com/products');
//   return response.json();
// }