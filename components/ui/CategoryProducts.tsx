import { View, Text } from "react-native";
import { useHomeCategories } from "@/hooks/useHomePage";
import ProductList from "./ProductList";
import Loader from "../Loader";
import ErrorNetwork from "../Error";

const CategoryProducts = () => {
  const { data: categories, isLoading, isError } = useHomeCategories();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorNetwork />;
  }

  return (
    <View className="px-4">
      {categories?.map((category) => (
        <View key={category} className="mb-8">
          <View className="mb-4">
            <Text className="text-2xl font-semibold text-gray-800 capitalize">
              {category.replace("'", "")}
            </Text>
            <Text className="text-gray-500 font-medium">
              Explore our {category.toLowerCase()} collection
            </Text>
          </View>
          <ProductList category={category} />
        </View>
      ))}
    </View>
  );
};

export default CategoryProducts;
