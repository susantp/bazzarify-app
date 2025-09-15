import { deleteStorage, setStorage } from "@/modules/core/utils/secureStore";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";

export default async function processAuth(token: string) {
  const response: TUserPayload | null = await actionGetUser(token);
  if (!response || !response.user) {
    await deleteStorage("token");
    await deleteStorage("user");
    return;
  }
  await setStorage("token", token);
  await setStorage("user", JSON.stringify(response.user));
  return;
}
