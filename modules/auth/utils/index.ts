import { openAuthSessionAsync } from "expo-web-browser";
import { app } from "@/modules/core/configs/app";
import { Platform } from "react-native";

export const initAuthSession = async (provider: string) => {
  const host =
    Platform.OS === "ios" ? "http://127.0.0.1:3000" : "http://10.0.2.2:3000";
  const url = `${host}/api/v1/auth/redirect?provider=google`;
  const {
    tempHost,
    remotePaths: {
      auth: {
        redirect: { path: redirectPath },
      },
    },
    modules: {
      auth: { path: modulePath },
    },
  } = app;

  // const url = tempHost
  //   .concat(modulePath)
  //   .concat(redirectPath.replace(":provider", "google"))
  //   .trim();

  return await openAuthSessionAsync(url);
};
