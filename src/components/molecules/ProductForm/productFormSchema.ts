import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(30, "Title must be less than 30 characters"),
  price: z.string().transform(Number).pipe(z.number().positive("Price must be greater than 0")),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  image: z.string().url("Must be a valid URL from fakestoreapi.com"),
  rating: z.object({
    rate: z.string().transform(Number).pipe(z.number().min(0).max(5, "Rate must be between 0 and 5")),
    count: z.string().transform(Number).pipe(z.number().min(0, "Count must be positive"))
  })
});

export type ProductFormData = z.infer<typeof productFormSchema>; 