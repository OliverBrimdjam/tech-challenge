import CategoryList from "@/components/molecules/CategoryList/CategoryList";

export default async function Home() {
  const categories = await fetchCategories();

  return (
    <>
      <header>olá</header>
      <main>
        <CategoryList categories={categories} />
        <section aria-labelledby="products-list">
          <h2 id="products-list">Products List</h2>
        </section>
      </main>
      <footer>footer</footer>
    </>
  );
}


async function fetchCategories() {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return response.json();
}