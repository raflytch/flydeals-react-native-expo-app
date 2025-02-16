import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useRef, useEffect } from "react";

const LoginBanner = () => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View className="w-72 h-72">
      <LottieView
        ref={animationRef}
        source={{
          uri: "https://lottie.host/65a8260d-2e90-4b6b-bc18-d9eb5b5dea50/CLQ8qRIDsj.lottie",
        }}
        autoPlay={false}
        loop
        style={{
          width: "100%",
          height: "100%",
        }}
        renderMode="AUTOMATIC"
        resizeMode="contain"
      />
    </View>
  );
};

export default LoginBanner;
