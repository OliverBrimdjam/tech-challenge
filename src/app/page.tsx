import { TProduct } from "@/@types/TProduct";
import nameTrimmer from "@/utils/nameTrimmer";
import CategoryList from "@/components/molecules/CategoryList/CategoryList";
import ProductsList from "@/components/molecules/ProductList/ProductList";
import { ProductProvider } from "@/contexts/ProductContext";

export default async function Home() {
  const categories = await fetchCategories();
  const products: TProduct[] = await fetchAllProducts();
  const trimmedProducts = nameTrimmer(products);

  return (
    <ProductProvider startProducts={trimmedProducts}>
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

async function fetchAllProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  return response.json();
}