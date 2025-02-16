import { View, Text, ScrollView } from "react-native";
import { useAllProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";
import ErrorNetwork from "@/components/Error";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProducts();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorNetwork />;
  }

  return (
    <ScrollView className="flex-1 bg-white pt-8">
      <View className="px-8 mb-4">
        <Text className="text-2xl font-semibold text-gray-800">
          All Products
        </Text>
        <Text className="text-gray-500 font-medium">
          Browse our complete collection
        </Text>
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
