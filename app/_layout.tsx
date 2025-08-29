import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { Provider } from "jotai";
import { useColorScheme } from "@/hooks/useColorScheme";
import "expo-dev-client";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/toastConfig";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://5711ab58e2cef392cd161c1452d1db40@o4508887288446976.ingest.de.sentry.io/4508887290282064",

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

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
  const loaded = true;
  useEffect(() => {
    const timeout = setTimeout(() => null, 100000);

    if (loaded) {
      SplashScreen.hideAsync();
    }
    return () => clearTimeout(timeout);
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </Provider>
        </QueryClientProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast config={toastConfig} />
    </>
  );
}
