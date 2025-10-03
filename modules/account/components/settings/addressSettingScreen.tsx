import ContentWrapper from "@/components/common/ContentWrapper";
import AddressListComponent from "@/modules/account/components/settings/AddressListComponent";
import { useAtomValue, useSetAtom } from "jotai";
import { addressListAtom } from "@/modules/user/atoms/addresessAtom";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import actionUpdateAddress from "@/modules/user/actions/actionUpdateAddress";
import Toast from "react-native-toast-message";

const AddressSettingScreen = () => {
  const addresses = useAtomValue(addressListAtom);
  const setAddresses = useSetAtom(addressListAtom);

  const handleSwitch = async (payload: TUserAddress) => {
    const isDefaultExists = addresses?.find(
      (address) => address.is_default && address.uuid !== payload.uuid,
    );

    if (!isDefaultExists && !payload.is_default) {
      Toast.show({
        position: "bottom",
        text1: "Invalid Action",
        text2: "must have one default address",
        type: "error",
      });
      return;
    }
    const response = await actionUpdateAddress(payload);
    if (response?.addresses) {
      Toast.show({
        position: "bottom",
        text1: "Address updated successfully!",
        type: "success",
      });
      setAddresses(response.addresses);
      return;
    }
    Toast.show({
      position: "bottom",
      text1: "Something went wrong",
      text2: "Please try again later",
      type: "error",
    });
  };
  return (
    <ContentWrapper className="bg-white">
      {addresses && addresses.length > 0 && (
        <AddressListComponent
          addresses={addresses}
          onSwitchChange={handleSwitch}
        />
      )}
    </ContentWrapper>
  );
};

export default AddressSettingScreen;
