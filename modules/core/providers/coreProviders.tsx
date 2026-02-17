import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useBootstrapApp } from "@/modules/core/hooks/useBootstrapApp";
import { ReactNode, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { router } from "expo-router";

export default function CoreProviders({ children }: { children: ReactNode }) {
  const { queryClient, colorScheme, ready } = useBootstrapApp();
  const authStatus = useAtomValue(authStatusAtom);
  const previousAuthStatusRef = useRef(authStatus);

  useEffect(() => {
    const previous = previousAuthStatusRef.current;
    if (previous !== "authenticated" && authStatus === "authenticated") {
      router.replace("/account/profile");
    }
    previousAuthStatusRef.current = authStatus;
  }, [authStatus]);

  if (!ready || authStatus === "unknown") return <ThemedLoader />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
