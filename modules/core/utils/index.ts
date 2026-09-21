import * as SplashScreen from "expo-splash-screen";
import { AppState } from "react-native";
import * as Sentry from "@sentry/react-native";

export async function hideSplash() {
  return SplashScreen.hideAsync();
}

export function subscribeOnResume(callback: () => void): () => void {
  let previousState = AppState.currentState;
  const sub = AppState.addEventListener(
    "change",
    (state) => {
      const hasResumed =
        (previousState === "inactive" || previousState === "background") &&
        state === "active";
      previousState = state;
      if (hasResumed) {
        callback();
      }
    },
  );
  return () => sub.remove();
}

export function initSentry() {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    // spotlight: __DEV__, // enable if needed
  });
}
export function toTitleCase(str: string) {
  if (!str) {
    return ""; // Handle empty or null strings
  }
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
