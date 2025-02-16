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

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="w-44 bg-white rounded-xl shadow-lg mx-2 overflow-hidden"
      >
        <View className="w-44 h-44 bg-white">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <View className="p-3">
          <Text
            className="text-sm font-medium text-gray-800 mb-1"
            numberOfLines={2}
          >
            {product.title}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-medium text-blue-600">
              ${product.price.toFixed(2)}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text className="text-xs text-gray-600 ml-0.5">
                {product.rating.rate}
              </Text>
            </View>
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
