import { Text, TouchableOpacity, View } from "react-native";
import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import React from "react";
import { OrderStatusBoxType } from "@/hooks/useProfileScreen";

interface OrderStatusProps {
  orderStatuses: OrderStatusBoxType[];
}

const OrderStatus = ({ orderStatuses }: OrderStatusProps) => (
  <View className="flex-col gap-y-4 px-2 py-2">
    <Text className="text-md">My Order</Text>
    <View className="flex-row">
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
