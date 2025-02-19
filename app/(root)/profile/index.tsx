import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import ErrorNetwork from "@/components/Error";
import { images } from "@/constants/images";
import ProfilePhotoModal from "@/components/ui/modal/ProfilePhotoModal";
import { useState } from "react";

const ProfileItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View className="flex-row items-center p-4 bg-white rounded-xl mb-3 shadow-sm border border-gray-50">
    <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
      <Ionicons name={icon as any} size={20} color="#4B5563" />
    </View>
    <View className="ml-3 flex-1">
      <Text className="text-gray-500 text-sm font-[Poppins-Regular]">
        {label}
      </Text>
      <Text className="text-gray-800 font-medium text-base mt-0.5 font-[Poppins-Medium]">
        {value}
      </Text>
    </View>
  </View>
);

const Profile = () => {
  const router = useRouter();
  const { data: profile, isLoading, isError, refetch } = useProfile();
  const { logout } = useAuth();
  const [showPhotoModal, setShowPhotoModal] = useState(false);

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
          <Text className="text-white font-[Poppins-Medium]">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-gray-50"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <View>
          <ImageBackground
            source={images.backgroundPhoto}
            className="h-56 w-full"
          >
            <View className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          </ImageBackground>

          <View className="px-4">
            <View className="bg-white rounded-2xl p-6 -mt-20 items-center shadow-sm border border-gray-100">
              <TouchableOpacity
                className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg -mt-20"
                onPress={() => setShowPhotoModal(true)}
                activeOpacity={0.9}
              >
                <Image
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/108708078?v=4",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Text className="text-2xl font-[Poppins-SemiBold] text-[#77B254]">
                {profile?.name.firstname} {profile?.name.lastname}
              </Text>
              <Text className="text-gray-500 mt-1 font-[Poppins-Medium]">
                @{profile?.username}
              </Text>
              <View className="flex-row items-center mt-4 bg-gray-50 px-4 py-2 rounded-full">
                <Ionicons name="checkmark-circle" size={16} color="#77B254" />
                <Text className="text-gray-600 ml-1 font-[Poppins-Medium] text-sm">
                  Verified Account
                </Text>
              </View>
            </View>
          </View>

          <View className="p-4">
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <Ionicons name="call-outline" size={18} color="#77B254" />
                <Text className="text-lg font-[Poppins-SemiBold] text-gray-800 ml-2">
                  Contact Information
                </Text>
              </View>
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
              <View className="flex-row items-center mb-3">
                <Ionicons name="location-outline" size={18} color="#77B254" />
                <Text className="text-lg font-[Poppins-SemiBold] text-gray-800 ml-2">
                  Address
                </Text>
              </View>
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
              className="bg-red-500 p-4 rounded-xl flex-row items-center justify-center mt-4 shadow-sm active:bg-red-600"
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text className="text-white font-[Poppins-SemiBold] text-lg ml-2">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ProfilePhotoModal
        isVisible={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        photoUrl="https://avatars.githubusercontent.com/u/108708078?v=4"
      />
    </>
  );
};

export default Profile;
