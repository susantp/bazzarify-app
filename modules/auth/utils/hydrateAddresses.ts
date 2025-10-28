import { Setter } from "@/modules/core/types";
import actionListAddresses from "@/modules/user/actions/actionListAddresses";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

export default async function hydrateAddresses(
  setAddresses: Setter<TUserAddress[] | null>,
): Promise<void> {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) return;

  const addresses = await actionListAddresses(token);
  if (!addresses?.addresses) return;

  setAddresses(addresses?.addresses);
}
