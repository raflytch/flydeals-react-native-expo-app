import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLayout, setSortBy } from "@/store/slices/product.slice";
import { SortOption, LayoutType } from "@/common/types/filter";

interface FilterHeaderProps {
  onSortPress: () => void;
}

const FilterHeader = ({ onSortPress }: FilterHeaderProps) => {
  const dispatch = useDispatch();
  const layout = useSelector((state: RootState) => state.product.layout);

  const toggleLayout = () => {
    dispatch(setLayout(layout === "grid" ? "horizontal" : "grid"));
  };

  return (
    <View className="flex-row justify-between items-center px-8 py-4">
      <TouchableOpacity
        onPress={onSortPress}
        className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full"
      >
        <Ionicons name="funnel-outline" size={20} color="#4B5563" />
        <Text className="ml-2 text-gray-600 font-medium">Sort</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleLayout}>
        <Ionicons
          name={layout === "grid" ? "grid" : "list"}
          size={24}
          color="#4B5563"
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilterHeader;
