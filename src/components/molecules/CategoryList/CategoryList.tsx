'use client'

import Button from "@/components/atoms/Button/Button";
import { useProducts } from "@/contexts/ProductContext";

type TCategoryListProps = {
  categories: string[];
}

export default function CategoryList({categories}: TCategoryListProps) {
  const {setCategory} = useProducts()

  return (
    <section aria-labelledby="categories">
      <nav className="flex flex-col w-[320px]">
        <h2 className="text-3xl m-2" id="categories">Categories</h2>
        <Button className="m-2" onClick={() => setCategory(null)}>All</Button>
        {categories.map((category)=>{
          return(
            <Button className="m-2" onClick={() => setCategory(category)} key={category}>{category}</Button>
          );
        })}
      </nav>
    </section>
  )
}
