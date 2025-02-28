import Button from "@/components/atoms/Button/Button";

type TCategoryListProps = {
  categories: string[];
}

export default function CategoryList({categories}: TCategoryListProps) {
  return (
    <section aria-labelledby="categories">
      <nav>
        <h2 id="categories">Categories</h2>
        {categories.map((category)=>{
          return(
            <Button key={category}>{category}</Button>
          );
        })}
      </nav>
    </section>
  )
}
