import { TProduct } from "./TProduct"

export type TPaginatedData = {
  data: TProduct[];
  total: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}