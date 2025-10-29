import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { Badge } from "react-native-paper";

interface OrderStatusProps {
  orderStatuses: ProfileMenuBoxType[];
  aggregates: Record<string, { count: number }> | undefined;
  onStatusPress: (id: string) => void;
}

const OrderStatus = ({
  orderStatuses,
  aggregates,
  onStatusPress,
}: OrderStatusProps) => {
  return (
    <View className="flex-col gap-y-4 py-2">
      <Text className="text-md px-2 text-lg font-semibold">My Order</Text>
      <View className="flex-row flex-wrap gap-y-6">
        {orderStatuses.map(({ id, icon, label, status }) => (
          <TouchableOpacity
            className="w-1/5 flex-col items-center gap-y-1"
            key={id}
            onPress={() => onStatusPress(id)}
          >
            <>
              {icon}
              {aggregates && status && aggregates[status]?.count ? (
                <Badge className="absolute -top-2 right-0 text-xl text-white">
                  {aggregates ? aggregates[status]?.count : 0}
                </Badge>
              ) : null}
            </>
            <Text className="text-sm">{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default OrderStatus;
