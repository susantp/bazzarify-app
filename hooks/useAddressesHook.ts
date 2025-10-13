import { useAtomValue } from "jotai";
import { getAddressListWithDefaultAtom } from "@/modules/user/atoms/addresessAtom";
import { TUserAddressDefault } from "@/modules/user/schemas/UserAddress";

const useAddressesHook = () => {
  const addresses = useAtomValue(getAddressListWithDefaultAtom);
  const handleSwitchChange = ({ uuid, is_default }: TUserAddressDefault) => {
    console.log({ uuid, is_default });
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
