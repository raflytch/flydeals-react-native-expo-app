import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { useProductDetail } from "@/hooks/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart.slices";
import Loader from "../Loader";
import ErrorNetwork from "../Error";
import FavoriteButton from "../FavoriteButton";

interface ProductDetailModalProps {
  productId: number;
  isVisible: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({
  productId,
  isVisible,
  onClose,
}: ProductDetailModalProps) => {
  const dispatch = useDispatch();
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const [quantity, setQuantity] = useState(1);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (product) {
      onClose();
      setTimeout(() => {
        dispatch(addToCart({ product, quantity }));
      }, 100);
      setQuantity(1);
    }
  };

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View className="flex-1 bg-black/50 justify-end">
        <Animated.View
          style={{
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0],
                }),
              },
            ],
          }}
          className="bg-white rounded-t-3xl overflow-hidden max-h-[85%]"
        >
          <View className="pt-4 px-4 flex-row justify-between items-center">
            {product && <FavoriteButton product={product} />}
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ErrorNetwork />
          ) : (
            <ScrollView className="px-4">
              <View className="w-full h-72 bg-white rounded-xl mb-4">
                <Image
                  source={{ uri: product?.image }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <View className="mb-4">
                <Text className="text-xl font-medium text-gray-800 mb-2">
                  {product?.title}
                </Text>
                <Text className="text-2xl font-semibold text-[#77B254] mb-2">
                  ${product?.price.toFixed(2)}
                </Text>
                <View className="flex-row items-center mb-4">
                  <Ionicons name="star" size={16} color="#FFB800" />
                  <Text className="text-sm text-gray-600 ml-1">
                    {product?.rating.rate} ({product?.rating.count} reviews)
                  </Text>
                </View>
                <Text className="text-gray-600 font-regular leading-6 mb-6">
                  {product?.description}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-6">
                <View className="flex-row items-center bg-gray-100 rounded-lg">
                  <TouchableOpacity onPress={handleDecrement} className="p-3">
                    <Ionicons name="remove" size={20} color="#4B5563" />
                  </TouchableOpacity>
                  <Text className="px-4 font-medium">{quantity}</Text>
                  <TouchableOpacity onPress={handleIncrement} className="p-3">
                    <Ionicons name="add" size={20} color="#4B5563" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleAddToCart}
                  className="bg-[#77B254] px-8 py-3 rounded-lg flex-row items-center"
                >
                  <Ionicons
                    name="cart"
                    size={20}
                    color="white"
                    className="mr-2"
                  />
                  <Text className="text-white font-medium ml-2">
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ProductDetailModal;
