import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState, useMemo } from "react";
import { useCategories, useProductsByCategory } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import ProductCardHorizontal from "@/components/ProductCardHorizontal";
import FilterHeader from "@/components/FilterHeader";
import SortModal from "@/components/SortModal";
import Loader from "@/components/Loader";
import ErrorNetwork from "@/components/Error";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AllProducts = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  const layout = useSelector((state: RootState) => state.product.layout);
  const sortBy = useSelector((state: RootState) => state.product.sortBy);

  const { data: categories, isLoading: loadingCategories } = useCategories();
  const {
    data: products,
    isLoading: loadingProducts,
    isError,
  } = useProductsByCategory(selectedCategory);

  const sortedProducts = useMemo(() => {
    if (!products) return [];

    const productsCopy = [...products];

    switch (sortBy) {
      case "price_asc":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "price_desc":
        return productsCopy.sort((a, b) => b.price - a.price);
      case "name_asc":
        return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
      case "name_desc":
        return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return productsCopy;
    }
  }, [products, sortBy]);

  if (loadingProducts || loadingCategories) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorNetwork />;
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-8 pt-8">
        <View className="flex-row items-center mb-4 gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-[#77B254] items-center justify-center mr-4"
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-semibold text-[#77B254]">
              All Products
            </Text>
            <Text className="text-gray-500 font-medium">
              Browse our complete collection
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            className={`mr-2 px-4 py-2 rounded-full ${
              selectedCategory === null ? "bg-[#77B254]" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                selectedCategory === null ? "text-white" : "text-gray-600"
              }`}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories?.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedCategory === category ? "bg-[#77B254]" : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === category ? "text-white" : "text-gray-600"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FilterHeader onSortPress={() => setIsSortModalVisible(true)} />

      {layout === "grid" ? (
        <View className="flex-row flex-wrap justify-center gap-4 px-2 mb-14">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      ) : (
        <View className="px-4 mb-14">
          {sortedProducts.map((product) => (
            <ProductCardHorizontal key={product.id} product={product} />
          ))}
        </View>
      )}

      <SortModal
        isVisible={isSortModalVisible}
        onClose={() => setIsSortModalVisible(false)}
      />
    </ScrollView>
  );
};

export default AllProducts;
