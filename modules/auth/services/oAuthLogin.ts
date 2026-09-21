import LoginProvider from "@/modules/auth/enums/loginProvider";
import { AuthCompletionEvent } from "@/modules/auth/domain/AuthCompletionEvent";
import normalizeOAuthCallback from "@/modules/auth/transport/normalizeOAuthCallback";
import { app } from "@/modules/core/configs/app";
import { openAuthSessionAsync } from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import Constants from "expo-constants";
import * as Sentry from "@sentry/react-native";

const resolveAppScheme = (): string => {
  const scheme = Constants.expoConfig?.scheme;
  if (typeof scheme === "string") {
    return scheme;
  }
  if (Array.isArray(scheme) && typeof scheme[0] === "string") {
    return scheme[0];
  }
  return "bazzarify";
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const _initAuthSession = async (provider: string) => {
  const {
    publicAuthUrl,
    remotePaths: {
      auth: {
        redirect: { path: redirectPath },
      },
    },
  } = app;
  const appScheme = resolveAppScheme();
  const redirectUri = makeRedirectUri({
    scheme: appScheme,
    path: "oauth-native-callback",
  });
  const url = [publicAuthUrl, redirectPath.replace(":provider", provider)].join(
    "/",
  );
  return await openAuthSessionAsync(url, redirectUri);
};

const _processGoogleLogin = async (): Promise<AuthCompletionEvent> => {
  const result = await _initAuthSession(LoginProvider.GOOGLE);
  if (result.type !== "success" || !("url" in result)) {
    throw new Error("No success");
  }

  const event = normalizeOAuthCallback({
    url: result.url,
    params: "params" in result && isRecord(result.params) ? result.params : null,
  });

  if (!event) {
    Sentry.captureMessage("OAuth callback normalization failed");
    throw new Error("No token found.");
  }

  return event;
};

const actionOAuthLogin = async (provider: LoginProvider) => {
  if (provider === "google") {
    console.log("OAuth login step: google", provider);
    return await _processGoogleLogin();
  }
  throw new Error("Not implemented");
};
export default actionOAuthLogin;
