import { TPaginatedData } from "@/@types/TPaginatedData";
import { TProduct } from "@/@types/TProduct";
import nameTrimmer from "@/utils/nameTrimmer";

export default async function apiFetchService(page: number = 1, per_page: number = 6, category: string | null = null) {
  const response = await fetch(
    category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products'
  );
  const data = await response.json();
  const trimmedData = nameTrimmer(data);
  
  return fakeApiPagination(trimmedData, page, per_page);
}

function fakeApiPagination(data: TProduct[], page = 1, per_page = 6) {
  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + per_page;
  const paginatedData = data.slice(startIndex, endIndex);

  const pageData: TPaginatedData = {
    data: paginatedData,
    total: data.length,
    current_page: page,
    per_page: per_page,
    total_pages: Math.ceil(data.length / per_page)
  };
  
  return pageData;
}