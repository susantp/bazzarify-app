import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  HomeIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UserIcon,
} from "react-native-heroicons/solid";
import { useLocation } from "@/modules/core/hooks/useLocation";
import { BlurView } from "expo-blur";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useLocation();
  const cart = useAtomValue(cartAtom);
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
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={200}
            style={StyleSheet.absoluteFill}
          />
        ),
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
          tabBarIcon: ({ color }) => (
            <Squares2X2Icon size={28} color={color} focusable={true} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarBadge: cart?.cart?.totals.items_count || undefined,
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
