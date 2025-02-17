import { TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleFavorite } from "@/store/slices/favorites.slices";
import { Product } from "@/common/types/product";

interface FavoriteButtonProps {
  product: Product | undefined;
  size?: number;
}

const FavoriteButton = ({ product, size = 24 }: FavoriteButtonProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = product
    ? favorites.some((item) => item.id === product.id)
    : false;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (!product) return;

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    dispatch(toggleFavorite(product));
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!product}
      className="w-10 h-10 rounded-full bg-white shadow-md items-center justify-center"
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={size}
          color={isFavorite ? "#FF4B4B" : "#4B5563"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
