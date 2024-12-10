import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/solid";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import AddressSettingScreen from "@/components/account/setting/screens/addressSettingScreen";
import { useRecoilState } from "recoil";
import { addressModalAtom } from "@/atoms/addressModalAtom";

const CheckoutAddressComponent = () => {
  const [showModal, setShowModal] = useRecoilState(addressModalAtom);
  return (
    <>
      <TouchableOpacity
        className="flex-row gap-x-2 rounded-full border border-gray-300 p-4"
        onPress={() => setShowModal(!showModal)}
      >
        <View className="w-1/12 flex-row items-center">
          <MapPinIcon size={26} color="black" />
        </View>
        <View className="w-9/12 flex-col gap-y-2">
          <Text>Koshi, Province</Text>
          <Text>Morang, Biratnagar</Text>
        </View>
        <View className="w-2/12 flex-row items-center">
          <Text>Change</Text>
        </View>
      </TouchableOpacity>
      <DemoModalComponent
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <View className="flex-col gap-y-2">
          <View className="w-full">
            <Text className="text-2xl font-bold">Shipping Address</Text>
          </View>
          <AddressSettingScreen />
          <View className="flex-row items-center justify-center">
            <TouchableOpacity className="rounded-full bg-orange-600 px-4 py-2">
              <Text className="text-xl text-white">Add another address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DemoModalComponent>
    </>
  );
};

export default CheckoutAddressComponent;
