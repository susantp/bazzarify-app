import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/solid";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { useAtom } from "jotai";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import DeliveryAddressPicker from "@/modules/user/components/DeliveryAddressPicker";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { formatUserAddress } from "@/modules/user/utils/address";

interface Props {
  user: TUser | null;
  defaultDeliveryAddress: TUserAddress | null;
}
const CheckoutAddressComponent = ({ user, defaultDeliveryAddress }: Props) => {
  const [showModal, setShowModal] = useAtom(addressModalAtom);

  return (
    <>
      <TouchableOpacity
        className="flex-row gap-x-2 rounded-full border border-gray-300 p-4"
        onPress={() => setShowModal(!showModal)}
      >
        <View className="w-1/12 flex-row items-center">
          <MapPinIcon size={26} color="black" />
        </View>
        <View className="w-9/12 flex-col">
          <Text>
            {defaultDeliveryAddress
              ? formatUserAddress(defaultDeliveryAddress)
              : "Select delivery address"}
          </Text>
          {(defaultDeliveryAddress?.phone || user?.phone) && (
            <Text className="text-sm text-gray-600">
              Phone: {defaultDeliveryAddress?.phone || user?.phone}
            </Text>
          )}
        </View>
        <View className="w-2/12 flex-row items-center justify-end">
          <Text className="text-sm">Change</Text>
        </View>
      </TouchableOpacity>
      <DemoModalComponent
        type="bottom"
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <DeliveryAddressPicker onClose={() => setShowModal(false)} />
      </DemoModalComponent>
    </>
  );
};

export default CheckoutAddressComponent;
