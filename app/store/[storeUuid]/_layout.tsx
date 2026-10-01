import { Tabs, useLocalSearchParams } from "expo-router";
import { HapticTab } from "@/components/HapticTab";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";
import Fontisto from "@react-native-vector-icons/fontisto";
import Ionicons from "@react-native-vector-icons/ionicons";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import useStorefrontHook from "@/modules/storefront/domain/hooks/useStorefrontHook";

export default function Layout() {
  const theme = useBazarifyTheme();
  const { storeUuid } = useLocalSearchParams<{
    storeUuid: string | string[];
  }>();

  const { store, storeTopProducts, storeCategories, storeProducts } =
    useStorefrontHook(storeUuid.toString());
  if (
    storeProducts.isLoading ||
    storeCategories.isLoading ||
    store.isLoading ||
    storeTopProducts.isLoading
  ) {
    return <ThemedLoader />;
  }

  return (
    <Tabs
      initialRouteName="index"
      backBehavior="history"
      screenOptions={{
        tabBarInactiveBackgroundColor: theme.colors.surface,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveBackgroundColor: theme.colors.surface,
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
              position: "absolute",
            },
            default: {},
          }),
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        initialParams={{ storeUuid }}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        initialParams={{ storeUuid }}
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        initialParams={{ storeUuid }}
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
