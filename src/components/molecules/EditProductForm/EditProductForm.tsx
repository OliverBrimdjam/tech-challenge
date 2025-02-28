'use client'

import { Button } from "@/components/ui/button"
import { TProduct } from "@/@types/TProduct"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editProductFormSchema, type ProductFormData } from "./editProductFormSchema"
import { useState } from "react"
import { toast } from "sonner"

type TEditProductFormProp = {
  product: TProduct
}

export function EditProductForm({product}: TEditProductFormProp) {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<ProductFormData>({
    resolver: zodResolver(editProductFormSchema)
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsOpen(false);
        toast.success('Product updated successfully!');
        reset();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Enter the Product Data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <div className="col-span-3">
                <Input
                  id="title"
                  {...register("title")}
                  className={errors.title ? "border-red-500" : ""}
                  defaultValue={product.title}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <div className="col-span-3">
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price")}
                  className={errors.price ? "border-red-500" : ""}
                  defaultValue={product.price}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Input
                  id="description"
                  {...register("description")}
                  className={errors.description ? "border-red-500" : ""}
                  defaultValue={product.description}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3">
                <Input
                  disabled
                  id="category"
                  {...register("category")}
                  className={errors.category ? "border-red-500" : ""}
                  value={product.category}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <div className="col-span-3">
                <Input
                  id="image"
                  type="url"
                  {...register("image")}
                  className={errors.image ? "border-red-500" : ""}
                  defaultValue={product.image}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rate" className="text-right">
                Rate
              </Label>
              <div className="col-span-3">
                <Input
                  id="rate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...register("rating.rate")}
                  className={errors.rating?.rate ? "border-red-500" : ""}
                  defaultValue={product.rating.rate}
                />
                {errors.rating?.rate && (
                  <p className="text-red-500 text-sm">{errors.rating.rate.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="count" className="text-right">
                Rate Count
              </Label>
              <div className="col-span-3">
                <Input
                  id="count"
                  type="number"
                  min="0"
                  {...register("rating.count")}
                  className={errors.rating?.count ? "border-red-500" : ""}
                  defaultValue={product.rating.count}
                />
                {errors.rating?.count && (
                  <p className="text-red-500 text-sm">{errors.rating.count.message}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
