import { Tabs, useLocalSearchParams } from "expo-router";
import { HomeIcon } from "react-native-heroicons/solid";
import React, { useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Platform } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { AuthGuard } from "@/modules/core/utils/authGuard";

export default function Layout() {
  // Make uuid required for type safety; we still guard at runtime just in case
  const { uuid } = useLocalSearchParams<{ uuid: string }>();

  if (__DEV__ && !uuid) {
    // Helpful warning during development if navigation didn't pass uuid
    console.warn(
      "[vendor/[uuid]] Missing uuid param — ensure tab hrefs and pushes include it.",
    );
  }

  const hrefs = useMemo(
    () => ({
      index: { pathname: "/vendor/[uuid]" as const, params: { uuid } },
      categories: {
        pathname: "/vendor/[uuid]/categories" as const,
        params: { uuid },
      },
      products: {
        pathname: "/vendor/[uuid]/products" as const,
        params: { uuid },
      },
    }),
    [uuid],
  );
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
            href: hrefs.index,
            tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: "Categories",
            href: hrefs.categories,
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Products",
            href: hrefs.products,
            tabBarIcon: ({ color }) => (
              <Fontisto name="shopping-package" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
