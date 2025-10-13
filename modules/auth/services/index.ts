import { deleteStorage, setStorage } from "@/modules/core/utils/secureStore";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import { AUTH_TOKEN_KEY, USER_KEY } from "@/modules/auth/config";
import * as Sentry from "@sentry/react-native";

export default async function processAuth(token: string) {
  Sentry.captureMessage("Storing token: " + !!token);
  await setStorage(AUTH_TOKEN_KEY, token);
  const response: TUserPayload | null = await actionGetUser(token);
  if (!response || !response.user) {
    Sentry.captureMessage(
      "Process fetching user with token - failed" + JSON.stringify(response),
    );
    await deleteStorage(AUTH_TOKEN_KEY);
    await deleteStorage(USER_KEY);
    return;
  }
  await setStorage(USER_KEY, JSON.stringify(response.user));
  return;
}
