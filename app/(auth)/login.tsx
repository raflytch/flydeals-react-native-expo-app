import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLogin } from "@/hooks/useLogin";
import Loader from "@/components/Loader";
import LoginBanner from "@/components/LoginBanner";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const handleSubmit = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    login.mutate(
      { username, password },
      {
        onError: (error) => {
          Alert.alert(
            "Login Failed",
            error.message || "An error occurred during login"
          );
        },
        onSuccess: () => {
          Alert.alert("Success", "Login successful!");
        },
      }
    );
  };

  if (login.isPending) {
    return <Loader />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 justify-center min-h-full">
          <View className="items-center mb-8">
            <LoginBanner />
            <Text className="text-4xl font-semibold text-gray-800 mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-500 text-lg text-center font-medium">
              Sign in to continue
            </Text>
          </View>

          <View className="flex flex-col gap-2">
            <View>
              <Text className="text-gray-700 font-medium text-base">
                Username
              </Text>
              <View className="flex-row items-center border-2 border-gray-200 rounded-2xl px-4 h-14 focus-within:border-[#77B254]">
                <Ionicons name="person-outline" size={22} color="#6B7280" />
                <TextInput
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-base text-gray-800 font-[Poppins-Regular]"
                  placeholderTextColor="#9CA3AF"
                  style={{ fontFamily: "Poppins-Regular" }}
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-medium text-base">
                Password
              </Text>
              <View className="flex-row items-center border-2 border-gray-200 rounded-2xl px-4 h-14 focus-within:border-[#77B254]">
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color="#6B7280"
                />
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="flex-1 ml-3 text-base text-gray-800 font-[Poppins-Regular]"
                  placeholderTextColor="#9CA3AF"
                  style={{ fontFamily: "Poppins-Regular" }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-2"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push("https://fakestoreapi.com/docs")}
              className="self-end"
            >
              <Text className="text-[#77B254] font-medium text-base">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={login.isPending}
              className="h-14 rounded-2xl items-center justify-center bg-[#77B254] active:bg-[#77B254]/90 disabled:bg-[#77B254]/50 mt-2"
            >
              <Text className="text-white font-semibold text-lg">Sign In</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-10 items-center">
            <Text className="text-[#77B254] text-sm font-medium">
              © {process.env.EXPO_PUBLIC_CREATOR_NAME}{" "}
              {new Date().getFullYear()}
            </Text>
            <Text className="text-[#77B254] text-sm font-medium">
              All Rights Reserved
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
