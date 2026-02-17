import * as Sentry from "@sentry/react-native";
import { Setter } from "@/modules/core/types";
import {
  deleteStorage,
  retrieveStorage,
} from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY, USER_KEY } from "@/modules/auth/config";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { AuthStatus } from "@/modules/auth/atoms/authStatusAtom";
import { getAuthToken } from "@/modules/auth/utils/token";
import LoginProvider from "@/modules/auth/enums/loginProvider";
import actionOAuthLogin from "@/modules/auth/services/oAuthLogin";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import actionGetUser from "@/modules/auth/services/actionGetUser";

export async function hydrateToken(
  setToken: Setter<string | null>,
  setAuthStatus: Setter<AuthStatus>,
): Promise<void> {
  try {
    const value = await getAuthToken();
    console.log("TOKEN_READ_RESULT", value ? "present" : "null");
    setToken(value);
    const nextStatus: AuthStatus = value ? "authenticated" : "guest";
    console.log("AUTH_STATUS_SET(" + nextStatus + ")");
    setAuthStatus(nextStatus);
    Sentry.captureMessage("Auth token hydrated: " + !!value);
  } catch (err) {
    setToken(null);
    console.log("AUTH_STATUS_SET(guest)");
    setAuthStatus("guest");
    Sentry.captureException(err);
  }
}

export async function hydrateUser(
  setUser: Setter<TUser | null>,
): Promise<void> {
  try {
    const value = await retrieveStorage(USER_KEY);
    if (!value) {
      setUser(null);
      Sentry.captureMessage("User hydrated: null");
      return;
    }
    setUser(JSON.parse(value));
    Sentry.captureMessage("User hydrated: " + !!value);
  } catch (err) {
    Sentry.captureException(err);
  }
}
