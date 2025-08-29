import {
  addressList,
  AddressType,
} from "@/components/account/setting/data/addressList";
import { atom } from "jotai";

export const addressAtom = atom<AddressType[]>(addressList);

export const hasDefaultAddressBoolean = atom((get) => {
  const addresses = get(addressAtom);
  return addresses.some((address) => address.default);
});
