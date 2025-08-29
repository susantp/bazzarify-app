import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/solid";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import { useAtom } from "jotai";
import { addressModalAtom } from "@/atoms/addressModalAtom";
import SelectAddressModalView from "@/components/cart/SelectAddressModalView";
import { router } from "expo-router";

const CheckoutAddressComponent = () => {
  const [showModal, setShowModal] = useAtom(addressModalAtom);
  const handleAddressPress = () => {
    setShowModal(!showModal);
    router.push(`/account/setting/address/create`);
  };
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
          <Text>Om Prakash Shaha &nbsp; &nbsp;98XXXXXXXX</Text>
          <Text>Koshi, Province</Text>
          <Text>Morang, Biratnagar</Text>
        </View>
        <View className="w-2/12 flex-row items-center">
          <Text className="text-sm">Change</Text>
        </View>
      </TouchableOpacity>
      <DemoModalComponent
        type="bottom"
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
      >
        <SelectAddressModalView
          title="Choose delivery address"
          onPress={handleAddressPress}
        />
      </DemoModalComponent>
    </>
  );
};

export default CheckoutAddressComponent;
