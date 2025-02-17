import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import ErrorNetwork from "@/components/Error";

const ProfileItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View className="flex-row items-center p-4 bg-white rounded-xl mb-3">
    <Ionicons name={icon as any} size={24} color="#4B5563" />
    <View className="ml-3 flex-1">
      <Text className="text-gray-500 text-sm">{label}</Text>
      <Text className="text-gray-800 font-medium text-base mt-1">{value}</Text>
    </View>
  </View>
);

const Profile = () => {
  const router = useRouter();
  const { data: profile, isLoading, isError, refetch } = useProfile();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Loader />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <ErrorNetwork />
        <TouchableOpacity
          onPress={() => refetch()}
          className="bg-[#77B254] px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-medium">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <View className="p-4">
        <View className="items-center mb-6 bg-white rounded-2xl p-6">
          <View className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <Image
              source={{
                uri: "https://avatars.githubusercontent.com/u/108708078?v=4",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-semibold text-[#77B254]">
            {profile?.name.firstname} {profile?.name.lastname}
          </Text>
          <Text className="text-gray-500 mt-1 font-medium">
            @{profile?.username}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Contact Information
          </Text>
          <ProfileItem
            icon="mail-outline"
            label="Email"
            value={profile?.email || ""}
          />
          <ProfileItem
            icon="call-outline"
            label="Phone"
            value={profile?.phone || ""}
          />
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Address
          </Text>
          <ProfileItem
            icon="location-outline"
            label="Street"
            value={`${profile?.address.street} ${profile?.address.number}`}
          />
          <ProfileItem
            icon="business-outline"
            label="City"
            value={profile?.address.city || ""}
          />
          <ProfileItem
            icon="map-outline"
            label="Zip Code"
            value={profile?.address.zipcode || ""}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 p-4 rounded-xl flex-row items-center justify-center mt-4"
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text className="text-white font-semibold text-lg ml-2">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
