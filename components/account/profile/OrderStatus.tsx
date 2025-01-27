import { Text, TouchableOpacity, View } from "react-native";
import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import React from "react";
import { ProfileMenuBoxType } from "@/hooks/useProfileScreen";

interface OrderStatusProps {
  orderStatuses: ProfileMenuBoxType[];
}

const OrderStatus = ({ orderStatuses }: OrderStatusProps) => (
  <View className="flex-col gap-y-4 py-2">
    <Text className="text-md px-2 text-lg font-semibold">My Order</Text>
    <View className="flex-row flex-wrap gap-y-6">
      {orderStatuses.map(({ id, icon, label }) => (
        <TouchableOpacity
          className="w-1/5 flex-col items-center gap-y-1"
          key={randomUUID()}
          onPress={() => router.push(`/account/order?statusId=${id}`)}
        >
          {icon}
          <Text className="text-sm">{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);
export default OrderStatus;
