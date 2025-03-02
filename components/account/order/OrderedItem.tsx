import { ProfileMenuBoxType } from "@/hooks/useProfileScreen";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Href, router } from "expo-router";
import React from "react";

interface OrderedItemProps {
  statusItem: undefined | ProfileMenuBoxType;
}

const OrderedItem = ({ statusItem }: OrderedItemProps) => (
  <View className="flex-row items-center bg-white">
    <View id="content-thumbnail" className="flex w-4/12 items-center">
      <Image
        source={require("@/assets/products/product.png")}
        className={`h-32 w-32`}
      />
    </View>

    <View id="content" className="flex w-8/12 flex-col items-start gap-y-2">
      <View id="cart-item-title">
        <Text className="text-md">
          Ultima Boom 141 ANC Earbuds (30 dB) | 45Hrs | game mode....
        </Text>
      </View>
      <View id="order-number">
        <Text className="text-sm">Order #92277157</Text>
      </View>
      <View className="w-full flex-row items-center justify-between">
        <View className="rounded-lg bg-slate-200 px-4 py-1">
          <Text className="text-sm">Jan, 09</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(statusItem?.routeTo as Href)}
          className="rounded-lg border border-orange-600 px-4 py-1"
        >
          <Text className="text-orange-600">{statusItem?.label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
export default OrderedItem;
