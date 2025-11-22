import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/solid";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { useAtom, useAtomValue } from "jotai";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import AddressSettingScreen from "@/modules/account/components/settings/addressSettingScreen";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { geocodeAddressAtom } from "@/atoms/locationAtom";
import { selectedDeliveryAddress } from "@/modules/cart/atoms";
import { userAtom } from "@/modules/auth/atoms/userAtom";

interface Props {
  user: TUser | null;
  defaultDeliveryAddress: TUserAddress | null;
}
const CheckoutAddressComponent = ({ user, defaultDeliveryAddress }: Props) => {
  const [showModal, setShowModal] = useAtom(addressModalAtom);
  const geoCodeAddress = useAtomValue(geocodeAddressAtom);
  const selectedAddress = useAtomValue(selectedDeliveryAddress);
  const displayAddress = selectedAddress || geoCodeAddress;
  const userData = useAtomValue(userAtom);
  return (
    <>
      <TouchableOpacity
        className="flex-row gap-x-2 rounded-full border border-gray-300 p-4"
        // onPress={() => setShowModal(!showModal)}
      >
        <View className="w-1/12 flex-row items-center">
          <MapPinIcon size={26} color="black" />
        </View>
        <View className="w-9/12 flex-col">
          <Text>{displayAddress?.formattedAddress}</Text>
          {userData?.phone && (
            <Text className="text-sm text-gray-600">
              Phone: {userData.phone}
            </Text>
          )}
        </View>
        {/*<View className="w-2/12 flex-row items-center">*/}
        {/*  <Text className="text-sm">Change</Text>*/}
        {/*</View>*/}
      </TouchableOpacity>
      <DemoModalComponent
        type="bottom"
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <AddressSettingScreen />
      </DemoModalComponent>
    </>
  );
};

export default CheckoutAddressComponent;
