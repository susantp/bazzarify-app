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
  const getStatusCount = (status: string | string[] | undefined) => {
    if (!aggregates || !status) {
      return 0;
    }
    if (Array.isArray(status)) {
      return status.reduce(
        (sum, item) => sum + (aggregates[item]?.count || 0),
        0,
      );
    }
    return aggregates[status]?.count || 0;
  };

  return (
    <View className="flex-col gap-y-4 py-2">
      <Text className="text-md px-2 text-lg font-semibold">My Order</Text>
      <View className="flex-row flex-wrap gap-2 px-2">
        {orderStatuses.map(({ id, label, status, icon }) => (
          <TouchableOpacity
            className="w-[31%] rounded-lg border border-slate-300 bg-white px-3 py-3"
            key={id}
            onPress={() => onStatusPress(id)}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1 items-center gap-y-1">
                {icon}
                <Text className="text-center text-sm font-medium">{label}</Text>
              </View>
              {getStatusCount(status) ? (
                <Badge className="bg-primary text-white">
                  {getStatusCount(status)}
                </Badge>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default OrderStatus;
