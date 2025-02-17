import { Product } from "@/common/types/product";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ProductDetailModal from "./ui/ProductDetailModal";

interface ProductCardHorizontalProps {
  product: Product;
}

const ProductCardHorizontal = ({ product }: ProductCardHorizontalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex-row bg-white rounded-xl shadow-lg mx-2 mb-4 overflow-hidden w-full"
      >
        <View className="w-32 h-32 bg-white p-2">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 p-4">
          <Text
            className="text-base font-medium text-gray-800 mb-2"
            numberOfLines={2}
          >
            {product.title}
          </Text>
          <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>
            {product.description}
          </Text>
          <View className="flex-row justify-between items-center mt-auto">
            <Text className="text-lg font-medium text-[#77B254]">
              ${product.price.toFixed(2)}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text className="text-sm text-gray-600 ml-1">
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

export default ProductCardHorizontal;
