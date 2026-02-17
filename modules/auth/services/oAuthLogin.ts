import LoginProvider from "@/modules/auth/enums/loginProvider";
import * as Linking from "expo-linking";
import { app } from "@/modules/core/configs/app";
import { openAuthSessionAsync } from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import Constants from "expo-constants";
import * as Sentry from "@sentry/react-native";

const getFirstString = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : undefined;
  }
  return undefined;
};

const _initAuthSession = async (provider: string) => {
  const {
    publicAuthUrl,
    remotePaths: {
      auth: {
        redirect: { path: redirectPath },
      },
    },
  } = app;
  const appScheme = Constants.expoConfig?.scheme ?? "bazzarify";
  const redirectUri = makeRedirectUri({
    scheme: appScheme,
    path: "oauth-native-callback",
  });
  const url = [publicAuthUrl, redirectPath.replace(":provider", provider)].join(
    "/",
  );
  return await openAuthSessionAsync(url, redirectUri);
};

const _processGoogleLogin = async (): Promise<string> => {
  const result = await _initAuthSession(LoginProvider.GOOGLE);
  console.log('after auth session result', { result });
  if (result.type !== "success" || !("url" in result)) {
    throw new Error("No success");
  }

  const { url } = result;
  const parsedURL = Linking.parse(url);
  const queryParams = parsedURL.queryParams ?? {};
  const resultParams =
    "params" in result && result.params ? (result.params as Record<string, unknown>) : {};
  const token = getFirstString(resultParams.token ?? queryParams.token);
  const success = getFirstString(resultParams.success ?? queryParams.success);
  Sentry.captureMessage(
    "OAuth login success query params: " + queryParams?.sucess,
  );
  if (success !== "true" || !token) {
    throw new Error("No token found.");
  }
  return token;
};

const actionOAuthLogin = async (provider: LoginProvider) => {
  if (provider === "google") {
    console.log("OAuth login step: google", provider);
    return await _processGoogleLogin();
  }
  throw new Error("Not implemented");
};
export default actionOAuthLogin;
