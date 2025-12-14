import { Tabs, useLocalSearchParams } from "expo-router";
import { HomeIcon } from "react-native-heroicons/solid";
import React from "react";
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Platform } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import useVendorHook from "@/modules/vendor/domain/hooks/useVendorHook";

export default function Layout() {
  const { vendorUuid } = useLocalSearchParams<{
    vendorUuid: string | string[];
  }>();

  const { vendorStore, vendorTopProducts, vendorCategories, vendorProducts } =
    useVendorHook(vendorUuid.toString());
  if (
    vendorProducts.isLoading ||
    vendorCategories.isLoading ||
    vendorStore.isLoading ||
    vendorTopProducts.isLoading
  ) {
    return <ThemedLoader />;
  }

  return (
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
        initialParams={{ vendorUuid }}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        initialParams={{ vendorUuid }}
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        initialParams={{ vendorUuid }}
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <Fontisto name="shopping-package" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
