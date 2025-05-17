import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  HomeIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UserIcon,
} from "react-native-heroicons/solid";
import { useLocation } from "@/modules/core/hooks/useLocation";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useLocation();
  return (
    <Tabs
      initialRouteName="index"
      backBehavior="history"
      screenOptions={{
        tabBarInactiveBackgroundColor: "#fff",
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
        name="search"
        options={{
          tabBarStyle: {
            display: "none",
          },
          href: null,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, focused }) => (
            <Squares2X2Icon size={28} color={color} focusable={true} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarStyle: {
            display: "none",
          },
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <ShoppingCartIcon size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products/[uuid]"
        options={{
          tabBarStyle: {
            display: "none",
          },
          href: null,
        }}
      />
      <Tabs.Screen
        name="vendor"
        options={{
          tabBarStyle: {
            display: "none",
          },
          href: null,
        }}
      />
      <Tabs.Screen
        name="guest"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <UserIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
