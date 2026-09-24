import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useAtomValue } from "jotai";
import { authSessionAtom } from "@/modules/auth/atoms/authSessionAtom";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import AuthTransitionResolver from "@/modules/auth/components/AuthTransitionResolver";
import { Stack } from "expo-router";
import { QueryClient } from "@tanstack/query-core";
import { useMemo } from "react";
import useAuthSessionEffects from "@/modules/auth/hooks/useAuthSessionEffects";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { useColorScheme } from "@/hooks/useColorScheme";

function AuthenticatedRoot() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="(private)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="oauth-native-callback"
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="oauth-native-callback"
        options={{ headerShown: false }}
      />
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
  const session = useAtomValue(authSessionAtom);
  const isPending =
    session.phase === "bootstrapping" ||
    session.phase === "authenticating" ||
    session.phase === "logging_out";
  const isAuthenticated = session.phase === "authenticated";

  useAuthSessionEffects();

  return (
    <BazarifyThemeProvider colorScheme={colorScheme}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthTransitionResolver />
          {isPending ? (
            <ThemedLoader />
          ) : isAuthenticated ? (
            <AuthenticatedRoot />
          ) : (
            <GuestRoot />
          )}
        </QueryClientProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </BazarifyThemeProvider>
  );
}
