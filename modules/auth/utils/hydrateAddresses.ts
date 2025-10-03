import { Setter } from "@/modules/core/types";
import actionListAddresses from "@/modules/account/actions/address/actionListAddresses";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";

export default async function hydrateAddresses(
  setAddresses: Setter<TUserAddress[] | null>,
): Promise<void> {
  const addresses = await actionListAddresses();
  console.log("Hydrated cart:", addresses?.addresses);
  if (addresses?.addresses) {
    setAddresses(addresses?.addresses);
  }
}
