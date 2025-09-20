import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import { Provider, useAtomValue } from "jotai";
import "expo-dev-client";
import { QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/toastConfig";
import { initSentry } from "@/modules/core/utils";
import { useBootstrapApp } from "@/modules/core/hooks/useBootstrapApp";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then(() => undefined);

export default function RootLayout() {
  initSentry();
  const { ready, queryClient, colorScheme } = useBootstrapApp();
  const token = useAtomValue(tokenAtom);
  console.log("token on root page", token);
  // const [loaded, error] = useFonts({
  //   Poppins_100Thin,
  //   Poppins_100Thin_Italic,
  //   Poppins_200ExtraLight,
  //   Poppins_200ExtraLight_Italic,
  //   Poppins_300Light,
  //   Poppins_300Light_Italic,
  //   Poppins_400Regular,
  //   Poppins_400Regular_Italic,
  //   Poppins_500Medium,
  //   Poppins_500Medium_Italic,
  //   Poppins_600SemiBold,
  //   Poppins_600SemiBold_Italic,
  //   Poppins_700Bold,
  //   Poppins_700Bold_Italic,
  //   Poppins_800ExtraBold,
  //   Poppins_800ExtraBold_Italic,
  //   Poppins_900Black,
  //   Poppins_900Black_Italic,
  // });

  if (!ready) return null;
  return (
    <Provider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </QueryClientProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast config={toastConfig} />
    </Provider>
  );
}
