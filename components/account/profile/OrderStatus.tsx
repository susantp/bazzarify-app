import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { Badge } from "react-native-paper";
import { getProfileOrderStatusPreview } from "@/components/account/profile/getProfileOrderStatusPreview";

interface OrderStatusProps {
  orderStatuses: ProfileMenuBoxType[];
  aggregates: Record<string, { count: number }> | undefined;
  onStatusPress: (id: string) => void;
  onViewAllPress: () => void;
}

const OrderStatus = ({
  orderStatuses,
  aggregates,
  onStatusPress,
  onViewAllPress,
}: OrderStatusProps) => {
  const previewStatuses = getProfileOrderStatusPreview(orderStatuses);

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
      <View className="flex-row items-center justify-between px-2">
        <Text className="text-md text-lg font-semibold">My Orders</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text className="text-sm font-medium text-primary">View all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: 12, paddingHorizontal: 8 }}
      >
        {previewStatuses.map(({ id, label, status, icon }) => (
          <TouchableOpacity
            className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-3"
            key={id}
            onPress={() => onStatusPress(id)}
          >
            <View className="min-h-20 items-center justify-center gap-y-1">
              <View className="absolute right-0 top-0">
                {getStatusCount(status) ? (
                  <Badge className="bg-primary text-white">
                    {getStatusCount(status)}
                  </Badge>
                ) : null}
              </View>
              {icon}
              <Text className="text-center text-sm font-medium">{label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default OrderStatus;
