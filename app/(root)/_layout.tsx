import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF5722",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          backgroundColor: "#FFFFFF",
          margin: 0,
          padding: 0,
        },
        tabBarActiveBackgroundColor: "#FFFFFF",
        tabBarInactiveBackgroundColor: "#FFFFFF",
        tabBarHideOnKeyboard: true,
        tabBarButton: (props: any) => {
          const touchableProps: TouchableOpacityProps = {
            ...props,
            delayLongPress: props.delayLongPress || undefined,
            style: [
              props.style,
              {
                backgroundColor: "#FFFFFF",
              },
            ],
          };
          return <TouchableOpacity {...touchableProps} />;
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="all-product"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites/index"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
