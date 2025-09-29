import * as Sentry from "@sentry/react-native";
import { Setter } from "@/modules/core/types";
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

export async function hydrateToken(
  setToken: Setter<string | null>,
): Promise<void> {
  try {
    const value = await retrieveStorage(AUTH_TOKEN_KEY);
    console.log("Hydrated token:", value);
    setToken(value);
    Sentry.captureMessage("Auth token hydrated: " + !!value);
  } catch (err) {
    Sentry.captureException(err);
  }
}
