import { Text, View } from "react-native";
import AddressSettingScreen from "@/modules/account/components/settings/addressSettingScreen";
import React from "react";
import { Link } from "expo-router";

interface Props {
  title: string;
}

const SelectAddressModalView = ({ title }: Props) => (
  <View className="flex-col gap-y-2">
    <View className="w-full">
      <Text className="text-2xl font-bold">{title}</Text>
    </View>
    <AddressSettingScreen />
    <View className="flex-row items-center justify-center">
      <Link
        href={`/account/setting/address/create`}
        className="rounded-full bg-orange-600 px-4 py-2"
      >
        <Text className="text-xl text-white">Add another address</Text>
      </Link>
    </View>
  </View>
);
export default SelectAddressModalView;
