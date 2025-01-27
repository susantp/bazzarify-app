import { Text, TouchableOpacity, View } from "react-native";
import AddressSettingScreen from "@/components/account/setting/screens/addressSettingScreen";
import React from "react";

interface SelectAddressModalViewProps {
  onPress: () => void;
  title: string;
}

const SelectAddressModalView = ({
  onPress,
  title,
}: SelectAddressModalViewProps) => (
  <View className="flex-col gap-y-2">
    <View className="w-full">
      <Text className="text-2xl font-bold">{title}</Text>
    </View>
    <AddressSettingScreen />
    <View className="flex-row items-center justify-center">
      <TouchableOpacity
        className="rounded-full bg-orange-600 px-4 py-2"
        onPress={onPress}
      >
        <Text className="text-xl text-white">Add another address</Text>
      </TouchableOpacity>
    </View>
  </View>
);
export default SelectAddressModalView;
