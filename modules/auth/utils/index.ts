import * as Sentry from "@sentry/react-native";
import { Setter } from "@/modules/core/types";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { AuthStatus } from "@/modules/auth/atoms/authStatusAtom";
import { getAuthToken, getStoredUser } from "@/modules/auth/utils/token";

export async function hydrateToken(
  setToken: Setter<string | null>,
  setAuthStatus: Setter<AuthStatus>,
): Promise<string | null> {
  try {
    const value = await getAuthToken();
    setToken(value);
    const nextStatus: AuthStatus = value ? "authenticated" : "guest";
    setAuthStatus(nextStatus);
    Sentry.captureMessage("Auth token hydrated: " + !!value);
    return value;
  } catch (err) {
    setToken(null);
    setAuthStatus("guest");
    Sentry.captureException(err);
    return null;
  }
}

export async function hydrateUser(
  setUser: Setter<TUser | null>,
): Promise<void> {
  try {
    const value = await getStoredUser();
    if (!value) {
      setUser(null);
      Sentry.captureMessage("User hydrated: null");
      return;
    }

    setUser(value);
    Sentry.captureMessage("User hydrated: true");
  } catch (err) {
    Sentry.captureException(err);
  }
}
