import CategoryList from "@/components/molecules/CategoryList/CategoryList";
import ProductsList from "@/components/molecules/ProductList/ProductList";
import { ProductProvider } from "@/contexts/ProductContext";
import { TPaginatedData } from "@/@types/TPaginatedData";
import getAllProductsOrByCategory from "@/services/apiFetchService";

export default async function Home() {
  const categories = await fetchCategories();
  const products: TPaginatedData = await getAllProductsOrByCategory();

  return (
    <ProductProvider startProducts={products}>
      <header className="bg-amber-400 h-16"></header>
      <main className="flex flex-row bg-[#DDD8D9]">
        <CategoryList categories={categories} />
        <ProductsList />
      </main>
      <footer>footer</footer>
    </ProductProvider>
  );
}

// -----------------------------using javascript hoisting-----------------------------------

async function fetchCategories() {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return response.json();
}
