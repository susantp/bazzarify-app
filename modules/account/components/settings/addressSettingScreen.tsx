import AddressListComponent from "@/modules/account/components/settings/AddressListComponent";
import { Button, Box } from "@/components/design-system";
import { PageContent } from "@/components/design-system/compositions";
import { useAtomValue, useSetAtom } from "jotai";
import { addressListAtom } from "@/modules/user/atoms/addresessAtom";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import actionUpdateAddress from "@/modules/user/actions/actionUpdateAddress";
import Toast from "react-native-toast-message";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

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
    <PageContent backgroundColor="background">
      <Box align="center" gap="xl" flex={1} style={styles.content}>
        {addresses && addresses.length > 0 ? (
          <AddressListComponent
            addresses={addresses}
            onSwitchChange={handleSwitch}
          />
        ) : null}
        <Link href="/account/setting/address/create" asChild>
          <Button label="Create new address" size="lg" />
        </Link>
      </Box>
    </PageContent>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
  },
});

export default AddressSettingScreen;
