import { Product } from "@/common/types/product";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ProductDetailModal from "./ui/ProductDetailModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const truncatedTitle =
    product.title.length > 35
      ? product.title.substring(0, 35) + "..."
      : product.title;

  const truncatedCategory =
    product.category.length > 20
      ? product.category.substring(0, 20) + "..."
      : product.category;

  const capitalizeCategory = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="w-44 bg-white rounded-2xl shadow-lg mx-2 overflow-hidden border border-gray-100"
      >
        <View className="relative w-44 h-44 bg-white pt-10 px-3">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="contain"
          />
          <View className="absolute top-2 left-2 bg-black/5 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Text className="text-[10px] text-gray-700 font-[Poppins-Medium]">
              {capitalizeCategory(truncatedCategory)}
            </Text>
          </View>
          <View className="absolute top-2 right-2 bg-white/70 backdrop-blur-md p-1 rounded-full shadow-sm">
            <View className="flex-row items-center px-1">
              <Ionicons name="star" size={10} color="#FFB800" />
              <Text className="text-[10px] text-gray-700 ml-0.5 font-[Poppins-Medium]">
                {product.rating.rate}
              </Text>
            </View>
          </View>
        </View>

        <View className="p-3 bg-white">
          <Text
            className="text-sm font-[Poppins-Medium] text-gray-800 mb-1.5"
            numberOfLines={1}
          >
            {truncatedTitle}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-baseline">
              <Text className="text-base font-[Poppins-SemiBold] text-[#77B254]">
                ${product.price.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-[#77B254] p-1.5 rounded-lg"
              onPress={() => setIsModalVisible(true)}
            >
              <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <ProductDetailModal
        productId={product.id}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default ProductCard;
