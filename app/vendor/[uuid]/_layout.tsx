import { Tabs } from "expo-router";
import { HomeIcon } from "react-native-heroicons/solid";
import React from "react";
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Platform } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { AuthGuard } from "@/modules/core/utils/authGuard";

export default function Layout() {
  return (
    <AuthGuard requireAuth={true}>
      <Tabs
        initialRouteName="index"
        backBehavior="history"
        screenOptions={{
          tabBarInactiveBackgroundColor: "#fff",
          tabBarActiveTintColor: Colors.light.tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveBackgroundColor: "#fff",
          tabBarIconStyle: {
            color: Colors.light.icon,
          },
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: "Categories",
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Products",
            tabBarIcon: ({ color }) => (
              <Fontisto name="shopping-package" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
