import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductCard from "@/components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import { useCategories } from "@/hooks/useProducts";
import EmptyFavorites from "@/components/ui/EmptyFavorites";

const Favorites = () => {
  const router = useRouter();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories } = useCategories();

  const filteredFavorites = useMemo(() => {
    if (!selectedCategory) return favorites;
    return favorites.filter((item) => item.category === selectedCategory);
  }, [favorites, selectedCategory]);

  if (favorites.length === 0) {
    return (
      <View className="flex-1 bg-white">
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
                Your Favorites
              </Text>
              <Text className="text-gray-500 font-medium">
                Save items you love
              </Text>
            </View>
          </View>
        </View>
        <EmptyFavorites message="No favorite products yet. Add some items to your favorites!" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
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
              Your Favorites
            </Text>
            <Text className="text-gray-500 font-medium">
              Save items you love
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            className={`mr-2 px-4 py-2 rounded-full ${
              selectedCategory === null ? "bg-[#77B254]" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                selectedCategory === null ? "text-white" : "text-gray-600"
              }`}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories?.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedCategory === category ? "bg-[#77B254]" : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === category ? "text-white" : "text-gray-600"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredFavorites.length === 0 ? (
        <EmptyFavorites message="No favorites in this category" />
      ) : (
        <View className="px-8">
          <FlatList
            data={filteredFavorites}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 56 }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default Favorites;
