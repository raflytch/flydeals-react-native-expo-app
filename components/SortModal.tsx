import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSortBy } from "@/store/slices/product.slice";
import { SortOption } from "@/common/types/filter";
import { Ionicons } from "@expo/vector-icons";

interface SortModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const sortOptions: SortOption[] = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
];

const SortModal = ({ isVisible, onClose }: SortModalProps) => {
  const dispatch = useDispatch();
  const currentSort = useSelector((state: RootState) => state.product.sortBy);

  const handleSortSelect = (value: string) => {
    dispatch(setSortBy(value));
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl">
          <View className="p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-semibold text-gray-800">
                Sort Products
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>

            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSortSelect(option.value)}
                className="py-4 border-b border-gray-100"
              >
                <View className="flex-row justify-between items-center">
                  <Text
                    className={`text-base ${
                      currentSort === option.value
                        ? "text-[#77B254] font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {option.label}
                  </Text>
                  {currentSort === option.value && (
                    <Ionicons name="checkmark" size={24} color="#77B254" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;
