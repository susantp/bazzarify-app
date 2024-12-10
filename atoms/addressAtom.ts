import {
  addressList,
  AddressType,
} from "@/components/account/setting/data/addressList";
import { atom, selector } from "recoil";

export const addressAtom = atom<AddressType[]>({
  key: "addressAtom",
  default: addressList,
});

export const hasDefaultAddressBoolean = selector<boolean>({
  key: "hasDefaultAddressBoolean",
  get: ({ get }) => {
    const addresses = get(addressAtom);
    return addresses.some((address) => address.default);
  },
});
