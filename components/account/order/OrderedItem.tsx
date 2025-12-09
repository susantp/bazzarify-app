import { Image, Text, TouchableOpacity, View } from "react-native";
import { Href, router } from "expo-router";
import React from "react";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { TGetOrder } from "@/modules/order/schemas/orderSchema";
import { format } from "date-fns";

interface OrderedItemProps {
  statusItem: undefined | ProfileMenuBoxType;
  order: TGetOrder;
  item: TGetOrder["items"][number];
}

const OrderedItem = ({ statusItem, order, item }: OrderedItemProps) => (
  <View className="flex-row items-center bg-white">
    <View id="content-thumbnail" className="flex w-4/12 items-center">
      <Image
        source={require("@/assets/products/product.png")}
        className={`h-32 w-32`}
      />
    </View>

    <View id="content" className="flex w-8/12 flex-col items-start gap-y-2">
      <View id="cart-item-title">
        <Text className="text-md">{item.name}</Text>
      </View>
      <View id="order-number">
        <Text className="text-sm">{order.order_number}</Text>
      </View>
      <View className="w-full flex-row items-center justify-between">
        <View className="rounded-lg bg-slate-200 px-4 py-1">
          <Text className="text-sm">
            {format(new Date(order.placed_at), "LLL, d")}
          </Text>
        </View>
        {statusItem?.action ? (
          <TouchableOpacity
            onPress={() =>
              statusItem?.action?.route
                ? router.push(statusItem?.action.route as Href)
                : undefined
            }
            className="rounded-lg border border-primary px-4 py-1"
          >
            <Text className="text-primary">{statusItem.action.label}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  </View>
);
export default OrderedItem;
