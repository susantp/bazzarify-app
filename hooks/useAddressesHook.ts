import { useAtomValue } from "jotai";
import { getAddressListWithDefaultAtom } from "@/modules/user/atoms/addresessAtom";

const useAddressesHook = () => {
  const addresses = useAtomValue(getAddressListWithDefaultAtom);
  const handleSwitchChange = (id: string, value: boolean) => {
    console.log({ id, value });
    // setAddresses((prevAddresses: AddressType[]) =>
    //   prevAddresses.map((address: AddressType) => ({
    //     ...address,
    //     default: address.id === id ? value : false,
    //   })),
    // );
  };

  return {
    addresses,
    handleSwitchChange,
  };
};
export default useAddressesHook;
