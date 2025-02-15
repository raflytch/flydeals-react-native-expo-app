import { Link } from "expo-router";
import { Text, View } from "react-native";

const NotFound = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-4xl font-bold mb-4">Oops!</Text>
      <Text className="text-xl mb-4 text-center">
        The page you're looking for doesn't exist.
      </Text>
      <Link href="/" className="bg-blue-500 px-6 py-3 rounded-lg">
        <Text className="text-white font-semibold">Go Home</Text>
      </Link>
    </View>
  );
};

export default NotFound;
