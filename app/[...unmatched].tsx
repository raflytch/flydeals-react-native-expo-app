import { Link, Stack, useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-white p-4">
        <View className="w-64 h-64 mb-4">
          <LottieView
            source={{
              uri: "https://lottie.host/f84257b2-adba-417d-bc00-61c3a1486a6f/cC7Q55dmTM.lottie",
            }}
            autoPlay
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text className="text-4xl font-medium mb-4">Oops!</Text>
        <Text className="text-xl font-semibold mb-8 text-center text-gray-600">
          The page you're looking for doesn't exist.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold text-lg">Go Home</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NotFound;
