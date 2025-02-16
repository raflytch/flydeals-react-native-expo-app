import api from "@/api/axios";
import { Product } from "@/common/types/product";

export const getHomeFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products?limit=5");
  return response.data;
};

export const getHomeCategories = async (): Promise<string[]> => {
  const response = await api.get("/products/categories");
  return response.data;
};

export const getHomeCategoryProducts = async (
  category: string
): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};
