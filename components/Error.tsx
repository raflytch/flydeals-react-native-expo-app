import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useQueryClient } from "@tanstack/react-query";

const ErrorNetwork = () => {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries();
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <LottieView
        source={{
          uri: "https://lottie.host/1be7670d-c87a-4b32-bf97-d6ed44c77ffc/Z6lGMH85X6.lottie",
        }}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Text className="text-xl font-semibold text-gray-800 mt-4 mb-2">
        Connection Error
      </Text>
      <Text className="text-gray-600 mb-6 text-center px-4 font-semibold">
        Please check your internet connection and try again
      </Text>
      <TouchableOpacity
        onPress={handleRetry}
        className="bg-blue-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold text-sm">Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorNetwork;
