import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useCategories, useProductsByCategory } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";
import ErrorNetwork from "@/components/Error";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AllProducts = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const {
    data: products,
    isLoading: loadingProducts,
    isError,
  } = useProductsByCategory(selectedCategory);

  if (loadingProducts || loadingCategories) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorNetwork />;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-8 pt-8 mb-4">
        <View className="flex-row items-center mb-4 gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4"
          >
            <Ionicons name="chevron-back" size={24} color="#4B5563" />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-semibold text-gray-800">
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
              selectedCategory === null ? "bg-blue-600" : "bg-gray-100"
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
                selectedCategory === category ? "bg-blue-600" : "bg-gray-100"
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

      <View className="flex-row flex-wrap justify-center gap-4 px-2 mb-14">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </ScrollView>
  );
};

export default AllProducts;
