import { Stack, useRouter, useSegments } from "expo-router";
import { QueryProvider } from "@/providers/query-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
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
        <RootLayoutNav onLayout={onLayoutRootView} />
      </QueryProvider>
    </ReduxProvider>
  );
};

function useProtectedRoute(isAuthenticated: boolean) {
  const segments = useSegments();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const inRootGroup = segments[0] === "(root)";

    if (!initialized) {
      setInitialized(true);

      if (!isAuthenticated) {
        if (!inAuthGroup) {
          router.replace("/login");
        }
      } else {
        if (inAuthGroup) {
          router.replace("/");
        }
      }
    }
  }, [isAuthenticated, segments, initialized, router]);
}

function RootLayoutNav({ onLayout }: { onLayout: () => Promise<void> }) {
  const { isAuthenticated, isLoading } = useAuth();

  useProtectedRoute(isAuthenticated);

  if (isLoading) {
    return null;
  }

  return (
    <View className="flex-1" onLayout={onLayout}>
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

            gestureEnabled: isAuthenticated,
          }}
        />
      </Stack>
    </View>
  );
}

export default AppLayout;
