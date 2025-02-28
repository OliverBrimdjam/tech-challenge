import Button from "@/components/atoms/Button/Button";

type TCategoryListProps = {
  categories: string[];
}

export default function CategoryList({categories}: TCategoryListProps) {
  return (
    <section aria-labelledby="categories">
      <nav className="flex flex-col w-[320px]">
        <h2 className="text-3xl m-2" id="categories">Categories</h2>
        {categories.map((category)=>{
          return(
            <Button className="m-2" key={category}>{category}</Button>
          );
        })}
      </nav>
    </section>
  )
}
