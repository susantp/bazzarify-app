import * as Sentry from "@sentry/react-native";
import { Setter } from "@/modules/core/types";
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { USER_KEY } from "@/modules/auth/config";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { getAuthToken } from "@/modules/auth/utils/token";

export async function hydrateToken(
  setToken: Setter<string | null>,
): Promise<void> {
  try {
    const value = await getAuthToken();
    setToken(value);
    Sentry.captureMessage("Auth token hydrated: " + !!value);
  } catch (err) {
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
