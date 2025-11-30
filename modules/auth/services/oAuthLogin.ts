import LoginProvider from "@/modules/auth/enums/loginProvider";
import * as Linking from "expo-linking";
import { app } from "@/modules/core/configs/app";
import { openAuthSessionAsync } from "expo-web-browser";
import * as Sentry from "@sentry/react-native";

const _initAuthSession = async (provider: string) => {
  const {
    publicAuthUrl,
    remotePaths: {
      auth: {
        redirect: { path: redirectPath },
      },
    },
  } = app;
  const redirectUri = Linking.createURL("guest/login");
  const url = [publicAuthUrl, redirectPath.replace(":provider", provider)].join(
    "/",
  );
  return await openAuthSessionAsync(url, redirectUri);
};

const _processGoogleLogin = async (): Promise<string> => {
  let result = await _initAuthSession(LoginProvider.GOOGLE);
  if (result.type !== "success" || !("url" in result)) {
    throw new Error("No success");
  }

  const { url } = result;
  const parsedURL = Linking.parse(url);
  const queryParams = parsedURL.queryParams;
  Sentry.captureMessage(
    "OAuth login success query params: " + queryParams?.sucess,
  );
  if (!queryParams) {
    throw new Error("No query params found.");
  }
  const { token, success } = queryParams;
  if (success !== "true" || !token) {
    throw new Error("No token found.");
  }
  return token as string;
};

const actionOAuthLogin = async (provider: LoginProvider) => {
  if (provider === "google") {
    console.log("OAuth login step: google", provider);
    return await _processGoogleLogin();
  }
  throw new Error("Not implemented");
};
export default actionOAuthLogin;
