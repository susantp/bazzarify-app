import { atom } from "jotai";
import {
  TUserAddress,
  TUserAddressCreate,
} from "@/modules/user/schemas/UserAddress";

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

// get address by uuid
export const getAddressByUuidAtom = atom((get) => {
  const addresses = get(addressListAtom);
  return (uuid: string) => {
    return addresses?.find((address) => address.uuid === uuid) || null;
  };
});

export const addressDraftAtom = atom<Partial<TUserAddressCreate> | null>(null);
