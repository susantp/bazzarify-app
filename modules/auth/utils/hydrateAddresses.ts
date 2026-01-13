import { Setter } from "@/modules/core/types";
import actionListAddresses from "@/modules/user/actions/actionListAddresses";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { getAuthToken } from "@/modules/auth/utils/token";

export default async function hydrateAddresses(
  setAddresses: Setter<TUserAddress[] | null>,
): Promise<void> {
  const token = await getAuthToken();
  if (!token) return;

  const addresses = await actionListAddresses(token);
  if (!addresses?.addresses) return;

  setAddresses(addresses?.addresses);
}
