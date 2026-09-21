import { Setter } from "@/modules/core/types";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import hydrateAddresses from "@/modules/auth/utils/hydrateAddresses";

export default function createAddressesTask(
  setAddresses: Setter<TUserAddress[] | null>,
  token: string,
) {
  return async () => {
    await hydrateAddresses(setAddresses, token);
  };
}
