import { Text, View } from "react-native";
import React from "react";
import { OrderTrackingItem } from "@/hooks/useOrderTracking";

interface TimelineItemProps {
  item: OrderTrackingItem;
}

export default function TimelineItem({ item }: TimelineItemProps) {
  const { active, description, status, date } = item;
  return (
    <View className={`flex-row items-center justify-between`}>
      <View className="flex-1 pr-12">
        <Text className={`font-semibold ${!active && `text-gray-500`}`}>
          {status}
        </Text>
        <Text className={`text-xs ${!active && `text-gray-500`}`}>
          {description}
        </Text>
      </View>
      <View className="flex-row gap-x-2">
        <View
          className={`h-4 w-4 rounded-full ${active ? "bg-orange-600" : "bg-gray-500"}`}
        ></View>
        <Text className={`text-xs ${!active && "text-gray-500"}`}>{date}</Text>
      </View>
    </View>
  );
}
