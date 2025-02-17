import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";
import ErrorNetwork from "../Error";

const ProductShowcase = () => {
  const router = useRouter();
  const { data: products, isLoading, isError } = useProducts(5);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <View className="h-96">
        <ErrorNetwork />
      </View>
    );
  }

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <View className="flex-1">
          <Text className="text-2xl font-semibold text-[#77B254]">
            Products
          </Text>
          <Text className="text-gray-500 font-medium">
            Discover our amazing collection
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/all-product")}
          className="bg-[#77B254] px-4 py-2 rounded-full"
        >
          <Text className="text-white font-semibold">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-2 pb-6"
      >
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductShowcase;
