import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  removeFromCart,
  updateQuantity,
  setPaymentModalVisible,
} from "@/store/slices/cart.slices";
import { Ionicons } from "@expo/vector-icons";
import PaymentModal from "@/components/ui/modal/PaymentModal";
import PaymentSuccessModal from "@/components/ui/modal/PaymentSuccessModal";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    dispatch(setPaymentModalVisible(true));
  };

  const renderHeader = () => (
    <View className="px-8 pt-8">
      <View className="flex-row items-center mb-4 gap-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#77B254] items-center justify-center mr-4"
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-semibold text-[#77B254]">
            Your Cart
          </Text>
          <Text className="text-gray-500 font-medium">
            Complete your purchase
          </Text>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View className="flex-1 bg-gray-50">
        {renderHeader()}
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-64 h-64 mb-4">
            <LottieView
              source={{
                uri: "https://lottie.host/f84257b2-adba-417d-bc00-61c3a1486a6f/cC7Q55dmTM.lottie",
              }}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
          </View>

          <Text className="text-xl font-medium text-gray-600 text-center mt-4 px-4">
            You have no items in your cart. Add some items to your cart to
            proceed with checkout
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {renderHeader()}
      <ScrollView className="flex-1">
        <View className="p-4">
          {cartItems.map((item) => (
            <View
              key={item.id}
              className="bg-white p-4 rounded-xl mb-4 flex-row items-center"
            >
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20"
                resizeMode="contain"
              />
              <View className="flex-1 ml-4">
                <Text
                  className="font-medium text-gray-800 mb-1"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text className="text-[#77B254] font-medium mb-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center bg-gray-100 rounded-lg">
                    <TouchableOpacity
                      onPress={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="p-2"
                    >
                      <Ionicons name="remove" size={16} color="#4B5563" />
                    </TouchableOpacity>
                    <Text className="px-3 font-medium">{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="p-2"
                    >
                      <Ionicons name="add" size={16} color="#4B5563" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    className="p-2"
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="bg-white p-4 shadow-lg">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 font-medium">Total</Text>
          <Text className="text-xl font-semibold text-[#77B254]">
            ${total.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleCheckout}
          className="bg-[#77B254] py-4 rounded-xl"
        >
          <Text className="text-white font-medium text-center">
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>

      <PaymentModal />
      <PaymentSuccessModal />
    </View>
  );
};

export default Cart;
