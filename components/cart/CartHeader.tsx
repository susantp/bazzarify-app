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
      <View className="flex w-9/12 flex-row items-center justify-end gap-x-4 bg-primary pr-2">
        <TouchableOpacity activeOpacity={0.6} onPress={onAddressButtonPress}>
          <Text className="rounded-xl bg-white px-2 py-1 text-sm text-primary">
            Choose delivery address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartHeader;
