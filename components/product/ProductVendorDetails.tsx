import { Text, View } from "react-native";
import {
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
} from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";
import React from "react";

const ProductVendorDetails = () => (
  <View
    id="vendor-info"
    className="flex-col gap-y-3 rounded-xl border border-gray-400 px-3 py-3"
  >
    <View className="flex-row items-center justify-between justify-items-center px-6">
      <View>
        <Text className="text-lg font-semibold">Ultima</Text>
        <View className="flex-row gap-x-1">
          <ShieldCheckIcon size={18} color={Colors.light.tint} />
          <Text className="text-orange-950">100% Authentic</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-items-center gap-x-2">
        <ChatBubbleLeftRightIcon size={18} color="black" />
        <Text className="text-lg">Chat</Text>
      </View>
    </View>
    <View className="flex-row">
      <View className="w-4/12 flex-col gap-y-3 border border-gray-400 p-4">
        <Text className="text-md">Trusted seller status</Text>
        <View className="flex items-center justify-items-center">
          <Text className="text-lg">80%</Text>
        </View>
      </View>
      <View className="w-4/12 flex-col gap-y-3 border border-gray-400 p-4">
        <Text className="text-md">Accurate delivery timing</Text>
        <View className="flex items-center justify-items-center">
          <Text className="text-lg">100%</Text>
        </View>
      </View>
      <View className="w-4/12 flex-col gap-y-3 border border-gray-400 p-4">
        <Text className="text-md">Chat response</Text>
        <View className="flex items-center justify-items-center">
          <Text className="text-lg">70%</Text>
        </View>
      </View>
    </View>
    <View className="flex items-center justify-items-center">
      <Text className="font-semibold text-orange-600">Visit Store</Text>
    </View>
  </View>
);

export default ProductVendorDetails;
