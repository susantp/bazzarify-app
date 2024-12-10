import { useRecoilState, useRecoilValue } from "recoil";
import { addressAtom, hasDefaultAddressBoolean } from "@/atoms/addressAtom";
import { AddressType } from "@/components/account/setting/data/addressList";
import { useEffect } from "react";

const useAddressesHook = () => {
  const [addresses, setAddresses] = useRecoilState(addressAtom);
  const hasDefaultAddress = useRecoilValue<boolean>(hasDefaultAddressBoolean);
  const handleSwitchChange = (id: string, value: boolean) => {
    setAddresses((prevAddresses: AddressType[]) =>
      prevAddresses.map((address: AddressType) => ({
        ...address,
        default: address.id === id ? value : false,
      })),
    );
  };
  const ensureDefaultAddress = () =>
    setAddresses((prevAddresses) =>
      prevAddresses.map((item, index) => ({ ...item, default: index === 0 })),
    );
  useEffect(() => {
    if (!hasDefaultAddress && addresses.length > 0) {
      ensureDefaultAddress();
    }
  });
  return {
    addresses,
    hasDefaultAddress,
    ensureDefaultAddress,
    handleSwitchChange,
  };
};
export default useAddressesHook;
