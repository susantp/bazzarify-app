import { atom } from "jotai";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";

export const addressListAtom = atom<TUserAddress[] | undefined | null>();

export const getAddressListWithDefaultAtom = atom((get) => {
  const addresses = get(addressListAtom);
  if (!addresses) return null;
  const isDefault = addresses?.find((address) => address.is_default) || null;
  if (isDefault) return addresses;
  return addresses.map((address, index) => ({
    ...address,
    is_default: index === 0,
  }));
});
export const getDefaultAddressAtom = atom((get) => {
  const addresses = get(addressListAtom);
  const isDefault = addresses?.find((address) => address.is_default) || null;
  if (isDefault) return isDefault;
  return addresses && addresses.length > 0 ? addresses[0] : null;
});
