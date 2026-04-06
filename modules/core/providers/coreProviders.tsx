import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useAtomValue } from "jotai";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { authRouteHoldAtom } from "@/modules/auth/atoms/authRouteHoldAtom";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import AuthTransitionResolver from "@/modules/auth/components/AuthTransitionResolver";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient } from "@tanstack/query-core";
import { useMemo } from "react";

function AuthenticatedRoot() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="(private)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="products/[uuid]" options={{ headerShown: false }} />
      <Stack.Screen
        name="vendor/[vendorUuid]"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

function GuestRoot() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="products/[uuid]" options={{ headerShown: false }} />
      <Stack.Screen
        name="vendor/[vendorUuid]"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function CoreProviders() {
  const colorScheme = useColorScheme();
  const queryClient = useMemo(() => new QueryClient(), []);
  const authStatus = useAtomValue(authStatusAtom);
  const routeHold = useAtomValue(authRouteHoldAtom);

  if (authStatus === "unknown") return <ThemedLoader />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthTransitionResolver />
        {routeHold ? (
          <ThemedLoader />
        ) : authStatus === "authenticated" ? (
          <AuthenticatedRoot />
        ) : (
          <GuestRoot />
        )}
      </QueryClientProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
