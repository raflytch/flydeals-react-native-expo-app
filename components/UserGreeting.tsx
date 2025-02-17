import { View, Text } from "react-native";
import { useProfile } from "@/hooks/useProfile";

const UserGreeting = () => {
  const { data: profile, isLoading } = useProfile();

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  if (isLoading || !profile) {
    return (
      <View className="px-4 mb-6">
        <Text className="text-2xl font-semibold text-[#77B254]">Welcome</Text>
        <Text className="text-gray-500 font-medium">
          Check out our latest products
        </Text>
      </View>
    );
  }

  const greeting = getTimeBasedGreeting();
  const firstName = profile.name.firstname;
  const capitalizedName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <View className="px-4 mb-6">
      <Text className="text-2xl font-semibold text-[#77B254]">
        {greeting}, {capitalizedName}!
      </Text>
      <Text className="text-gray-500 font-medium">
        Check out our latest products
      </Text>
    </View>
  );
};

export default UserGreeting;
