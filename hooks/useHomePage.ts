import { useQuery } from "@tanstack/react-query";
import {
  getHomeFeaturedProducts,
  getHomeCategories,
  getHomeCategoryProducts,
} from "@/services/home.service";
import { Product } from "@/common/types/product";

export const useHomeFeaturedProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["home", "featured"],
    queryFn: () => getHomeFeaturedProducts(),
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};

export const useHomeCategories = () => {
  return useQuery<string[]>({
    queryKey: ["home", "categories"],
    queryFn: getHomeCategories,
    retry: 2,
    staleTime: 1000 * 60 * 30,
  });
};

export const useHomeCategoryProducts = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ["home", "category", category],
    queryFn: () => getHomeCategoryProducts(category),
    enabled: !!category,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};
