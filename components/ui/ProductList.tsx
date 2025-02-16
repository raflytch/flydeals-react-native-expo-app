import { View, ScrollView } from "react-native";
import { useHomeCategoryProducts } from "@/hooks/useHomePage";
import ProductCard from "../ProductCard";
import Loader from "../Loader";
import ErrorNetwork from "../Error";

interface ProductListProps {
  category: string;
}

const ProductList = ({ category }: ProductListProps) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useHomeCategoryProducts(category);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorNetwork />;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {products?.map((product) => (
        <View key={product.id} className="mr-4 last:mr-0 pb-6">
          <ProductCard product={product} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ProductList;
