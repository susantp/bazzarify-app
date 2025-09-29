import * as SplashScreen from "expo-splash-screen";
import { AppState } from "react-native";
import * as Sentry from "@sentry/react-native";

export async function hideSplash() {
  return SplashScreen.hideAsync();
}

export function subscribeOnResume(callback: () => void): () => void {
  console.log("app state: ", AppState.currentState);
  const sub = AppState.addEventListener(
    "change",
    (state) => state === "active" && callback(),
  );
  return () => sub.remove();
}

export function initSentry() {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    // spotlight: __DEV__, // enable if needed
  });
}
