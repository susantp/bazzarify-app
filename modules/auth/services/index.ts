import { setToken } from "@/modules/core/utils/secureStore";

export default async function processAuth(token: string) {
  await setToken("token", token);
}
