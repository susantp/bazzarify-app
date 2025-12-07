import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenHeader from "@/components/common/ScreenHeader";

interface Props {
  onAddressButtonPress: () => void;
}
const CartHeader = ({ onAddressButtonPress }: Props) => {
  return (
    <View className="flex flex-row justify-between">
      <View className="w-3/12">
        <ScreenHeader title="My Cart" />
      </View>
      <View className="bg-primary flex w-9/12 flex-row items-center justify-end gap-x-4 pr-2">
        <TouchableOpacity activeOpacity={0.6} onPress={onAddressButtonPress}>
          <Text className="text-primary rounded-xl bg-white px-2 py-1 text-sm">
            Choose delivery address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartHeader;
