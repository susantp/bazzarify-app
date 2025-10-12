import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";
import { Provider } from "jotai";
import "expo-dev-client";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/toastConfig";
import { initSentry } from "@/modules/core/utils";
import AppLayout from "@/modules/core/components/AppLayout";
import { useEffect } from "react";
import { setStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then(() => undefined);
export default function RootLayout() {
  useEffect(() => {
    initSentry();
  }, []);
  return (
    <Provider>
      <AppLayout />
      <Toast config={toastConfig} />
    </Provider>
  );
}
