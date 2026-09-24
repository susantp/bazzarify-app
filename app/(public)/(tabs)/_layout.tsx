import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { useLocation } from "@/modules/core/hooks/useLocation";
import { BlurView } from "expo-blur";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/modules/cart/atoms";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const theme = useBazarifyTheme();
  useLocation();
  const cart = useAtomValue(cartAtom);
  return (
    <Tabs
      initialRouteName="index"
      backBehavior="history"
      screenOptions={{
        tabBarInactiveBackgroundColor: theme.colors.surface,
        tabBarActiveBackgroundColor: theme.colors.surface,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <BlurView
            tint={theme.mode}
            intensity={200}
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: theme.colors.surface },
            ]}
          />
        ),
        tabBarStyle: [
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
          },
          Platform.select({
            ios: {
              // Keep the iOS tab bar over the existing blur surface.
              position: "absolute",
            },
            default: {},
          }),
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
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
            <Ionicons name="grid" size={28} color={color} />
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
            <Ionicons name="cart" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          href: "/account",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
