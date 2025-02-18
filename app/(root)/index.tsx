import { ScrollView, View } from "react-native";
import ProductShowcase from "@/components/ui/ProductShowcase";
import CategoryProducts from "@/components/ui/CategoryProducts";
import UserGreeting from "@/components/UserGreeting";
import BannerSlider from "@/components/ui/BannerSlider";

const Index = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="pt-8">
        <UserGreeting />
        <BannerSlider />
        <ProductShowcase />
        <CategoryProducts />
      </View>
    </ScrollView>
  );
};

export default Index;
