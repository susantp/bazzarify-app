import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/solid";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { useAtom } from "jotai";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import AddressSettingScreen from "@/modules/account/components/settings/addressSettingScreen";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { LocationGeocodedAddress } from "expo-location";

interface Props {
  user: TUser | null;
  defaultDeliveryAddress: LocationGeocodedAddress | null;
}
const CheckoutAddressComponent = ({ user, defaultDeliveryAddress }: Props) => {
  const [showModal, setShowModal] = useAtom(addressModalAtom);

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
          <Text>{defaultDeliveryAddress?.formattedAddress}</Text>
          {user?.phone && (
            <Text className="text-sm text-gray-600">Phone: {user.phone}</Text>
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
