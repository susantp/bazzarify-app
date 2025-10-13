import { Setter } from "@/modules/core/types";
import actionListAddresses from "@/modules/user/actions/actionListAddresses";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";

export default async function hydrateAddresses(
  setAddresses: Setter<TUserAddress[] | null>,
): Promise<void> {
  const addresses = await actionListAddresses();
  if (addresses?.addresses) {
    setAddresses(addresses?.addresses);
  }
}
