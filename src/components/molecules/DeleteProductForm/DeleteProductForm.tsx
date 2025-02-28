'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import { TProduct } from "@/@types/TProduct"

type TDeleteProductFormProp = {
  product: TProduct
}

export function DeleteProductForm({product}: TDeleteProductFormProp) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setIsOpen(false);
        toast.success('Product deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onSubmit}>Delete</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
