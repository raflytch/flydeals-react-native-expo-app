import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductById,
  getProducts,
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
