import { Stack } from "expo-router";
import { QueryProvider } from "../providers/query-provider";
import "./global.css";

const RootLayout = () => {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack>
    </QueryProvider>
  );
};

export default RootLayout;
