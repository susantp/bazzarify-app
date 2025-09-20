import * as SplashScreen from "expo-splash-screen";
import { AppState } from "react-native";
import * as Sentry from "@sentry/react-native";

export async function hideSplash() {
  return SplashScreen.hideAsync();
}

export function subscribeOnResume(callback: () => void): () => void {
  console.log(AppState.currentState);
  const sub = AppState.addEventListener("change", (state) => {
    if (state === "active") {
      console.log("resuming");
      callback();
    }
  });
  return () => sub.remove();
}

export function initSentry() {
  Sentry.init({
    dsn: "https://5711ab58e2cef392cd161c1452d1db40@o4508887288446976.ingest.de.sentry.io/4508887290282064",
    // spotlight: __DEV__, // enable if needed
  });
}
