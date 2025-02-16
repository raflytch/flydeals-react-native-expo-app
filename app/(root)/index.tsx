import { ScrollView, View } from "react-native";
import ProductShowcase from "@/components/ui/ProductShowcase";
import CategoryProducts from "@/components/ui/CategoryProducts";

const Index = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="pt-8">
        <ProductShowcase />
        <CategoryProducts />
      </View>
    </ScrollView>
  );
};

export default Index;
