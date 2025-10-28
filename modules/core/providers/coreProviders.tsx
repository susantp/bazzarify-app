import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useBootstrapApp } from "@/modules/core/hooks/useBootstrapApp";
import { ReactNode } from "react";

export default function CoreProviders({ children }: { children: ReactNode }) {
  const { queryClient, colorScheme, ready } = useBootstrapApp();
  if (!ready) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
