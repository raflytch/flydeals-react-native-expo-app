import { Stack } from "expo-router";
import { QueryProvider } from "@/providers/query-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";
import { AuthProvider } from "@/providers/auth-provider";
import AddToCartSuccessModal from "@/components/ui/modal/AddToCartSuccessModal";
import PaymentSuccessModal from "@/components/ui/modal/PaymentSuccessModal";
import PaymentModal from "@/components/ui/modal/PaymentModal";
import "./global.css";

SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ReduxProvider>
      <QueryProvider>
        <AuthProvider>
          <View className="flex-1" onLayout={onLayoutRootView}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="(root)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
            <AddToCartSuccessModal />
            <PaymentModal />
            <PaymentSuccessModal />
          </View>
        </AuthProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default AppLayout;
