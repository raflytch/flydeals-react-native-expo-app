import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import { images } from "@/constants/images";

const { width: screenWidth } = Dimensions.get("window");
const horizontalPadding = 26;
const bannerWidth = screenWidth - horizontalPadding;

const bannerImages = [
  images.backgroundOne,
  images.backgroundTwo,
  images.backgroundThree,
];

const BannerSlider = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / bannerWidth);
    setActiveIndex(index);
  };

  const handleManualScroll = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * bannerWidth,
      animated: true,
    });
    setActiveIndex(index);
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoScrolling) {
      intervalId = setInterval(() => {
        const nextIndex = (activeIndex + 1) % bannerImages.length;
        handleManualScroll(nextIndex);
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeIndex, isAutoScrolling]);

  return (
    <View className="px-4 mb-8">
      <View className="relative">
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="rounded-xl overflow-hidden"
        >
          {bannerImages.map((image, index) => (
            <View
              key={index}
              style={{ width: bannerWidth }}
              className="rounded-xl overflow-hidden"
            >
              <Image
                source={image}
                style={{ width: bannerWidth, height: 180 }}
                className="rounded-xl"
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>

        <View className="absolute bottom-3 left-0 right-0 flex-row justify-center items-center">
          {bannerImages.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleManualScroll(index)}
              className="mx-1"
            >
              <View
                className={`w-2 h-2 rounded-full ${
                  activeIndex === index ? "bg-[#77B254]" : "bg-white/50"
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BannerSlider;
