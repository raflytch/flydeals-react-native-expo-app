import { View, Modal, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setPaymentSuccessModalVisible } from "@/store/slices/cart.slices";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

const PaymentSuccessModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const animation = useRef<LottieView>(null);
  const isVisible = useSelector(
    (state: RootState) => state.cart.isPaymentSuccessModalVisible
  );

  useEffect(() => {
    if (isVisible) {
      animation.current?.reset();
      animation.current?.play();
    }
  }, [isVisible]);

  const handleClose = () => {
    dispatch(setPaymentSuccessModalVisible(false));
    router.push("/");
  };

  if (!isVisible) return null;

  return (
    <Modal visible={true} transparent>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-full h-full items-center justify-center">
          <View className="w-64 h-64 mb-8">
            <LottieView
              ref={animation}
              source={require("@/assets/animations/payment-success.json")}
              autoPlay
              speed={1}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text className="text-2xl font-semibold text-gray-800 mb-4">
            Payment Successful!
          </Text>
          <TouchableOpacity
            onPress={handleClose}
            className="px-6 py-3 bg-[#77B254] rounded-lg"
          >
            <Text className="font-medium text-white">Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentSuccessModal;
