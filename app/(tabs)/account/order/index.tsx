import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import useOrderStatusBox from "@/modules/order/hooks/useOrderStatusBox";
import useOrder from "@/modules/order/hooks/useOrder";
import { toTitleCase } from "@/modules/core/utils";
import { useAtomValue } from "jotai";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import formatOrderDate from "@/modules/order/utils/formatOrderDate";

export default function Page() {
  const { statusId } = useLocalSearchParams();
  const { getFilteredOrder, orderStatusAggregated } = useOrder();
  const orderStatuses = useAtomValue(orderStatusesState);
  const fallbackStatuses = Object.keys(orderStatusAggregated || {});
  const statusSource = orderStatuses.length ? orderStatuses : fallbackStatuses;
  const { orderStatusBoxes } = useOrderStatusBox(statusSource);
  const [status, setStatus] = useState(orderStatusBoxes[0]?.id || "toPay");
  useEffect(() => {
    if (typeof statusId === "string") {
      setStatus(statusId);
    }
    if (!statusId && orderStatusBoxes[0]?.id) {
      setStatus(orderStatusBoxes[0].id);
    }
  }, [statusId, orderStatusBoxes]);
  const statusItem = orderStatusBoxes.find(
    (orderStatus) => orderStatus.id === status,
  );
  const filteredOrders = getFilteredOrder(statusItem) || [];
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Your Order" />
      <ContentWrapper className="gap-y-6 bg-white px-3 py-2">
        <View className="flex-row flex-wrap gap-2">
          {orderStatusBoxes.map((orderStatus) => (
            <TouchableOpacity
              key={orderStatus.id}
              onPress={() => setStatus(orderStatus.id)}
              className="flex-row rounded-lg border border-slate-400 px-2 py-1"
            >
              <Text
                className={`${status === orderStatus.id ? "text-primary" : undefined} text-md`}
              >
                {orderStatus.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {!filteredOrders.length ? (
          <Text className="text-sm text-gray-500">No orders found.</Text>
        ) : null}
        {filteredOrders.map((order) => (
          <TouchableOpacity
            key={order.uuid || order.order_number}
            className="rounded-lg border border-slate-200 p-3"
            onPress={() =>
              router.push({
                pathname: "/account/order/[id]",
                params: {
                  id: encodeURIComponent(order.uuid || order.order_number),
                },
              })
            }
          >
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold">{order.order_number}</Text>
              <Text className="text-xs text-gray-500">
                {toTitleCase(order.status.replace(/_/g, " "))}
              </Text>
            </View>
            <Text className="mt-1 text-xs text-gray-500">
              {formatOrderDate(order.placed_at, "LLL d, yyyy")}
            </Text>
          </TouchableOpacity>
        ))}
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
