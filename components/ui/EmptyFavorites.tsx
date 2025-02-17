import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

interface EmptyFavoritesProps {
  message: string;
}

const EmptyFavorites = ({ message }: EmptyFavoritesProps) => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <LottieView
        source={{
          uri: "https://lottie.host/f84257b2-adba-417d-bc00-61c3a1486a6f/cC7Q55dmTM.lottie",
        }}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Text className="text-xl font-medium text-gray-600 text-center mt-4">
        {message}
      </Text>
    </View>
  );
};

export default EmptyFavorites;
