import { View } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <LottieView
        source={{
          uri: "https://lottie.host/4bf76efe-e473-44bf-b59b-1fd89a2888a6/DXtq8ivFgb.lottie",
        }}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default Loader;
