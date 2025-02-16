import api from "@/api/axios";
import { Product } from "@/common/types/product";

export const getProducts = async (limit: number = 5): Promise<Product[]> => {
  const response = await api.get(`/products?limit=${limit}`);
  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
