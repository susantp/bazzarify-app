import { deleteStorage, setStorage } from "@/modules/core/utils/secureStore";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import { AUTH_TOKEN_KEY, USER_KEY } from "@/modules/auth/config";

export default async function processAuth(token: string) {
  const response: TUserPayload | null = await actionGetUser(token);
  if (!response || !response.user) {
    await deleteStorage(AUTH_TOKEN_KEY);
    await deleteStorage(USER_KEY);
    return;
  }
  await setStorage(AUTH_TOKEN_KEY, token);
  await setStorage(USER_KEY, JSON.stringify(response.user));
  return;
}
