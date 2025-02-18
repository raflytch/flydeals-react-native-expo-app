import { View, Modal, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  setPaymentModalVisible,
  setPaymentSuccessModalVisible,
  clearCart,
} from "@/store/slices/cart.slices";

const PaymentModal = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector(
    (state: RootState) => state.cart.isPaymentModalVisible
  );
  const total = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const handleCancel = () => {
    dispatch(setPaymentModalVisible(false));
  };

  const handleConfirm = async () => {
    dispatch(setPaymentModalVisible(false));
    await new Promise((resolve) => setTimeout(resolve, 100));
    dispatch(setPaymentSuccessModalVisible(true));
    dispatch(clearCart());
  };

  if (!isVisible) return null;

  return (
    <Modal visible={true} transparent>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white p-6 rounded-2xl w-[90%] max-w-sm">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Payment
          </Text>
          <Text className="text-gray-600 mb-4 font-medium">
            Are you sure you want to proceed with the payment of $
            {total.toFixed(2)}?
          </Text>
          <View className="flex-row justify-end gap-4">
            <TouchableOpacity
              onPress={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              <Text className="font-medium text-gray-800">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="px-4 py-2 bg-[#77B254] rounded-lg"
            >
              <Text className="font-medium text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
