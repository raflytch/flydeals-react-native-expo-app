import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductById,
  getProducts,
  getCategories,
  getProductsByCategory,
} from "@/services/product.service";
import { Product } from "@/common/types/product";

export const useProducts = (limit: number = 5) => {
  return useQuery<Product[]>({
    queryKey: ["products", limit],
    queryFn: () => getProducts(limit),
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductDetail = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    retry: 2,
  });
};

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: 2,
    staleTime: 1000 * 60 * 30,
  });
};

export const useProductsByCategory = (category: string | null) => {
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: () =>
      category ? getProductsByCategory(category) : getAllProducts(),
    enabled: true,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};
