import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import useOrder from "@/modules/order/hooks/useOrder";
import useOrderStatusBox from "@/modules/order/hooks/useOrderStatusBox";
import OrderedItem from "@/components/account/order/OrderedItem";
import { useAtomValue } from "jotai";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import resolveTrackingOrderRef from "@/modules/order/utils/resolveTrackingOrderRef";

export default function OrderDetailsPage() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const orderId = Array.isArray(id) ? id[0] : id;
  const normalizedOrderId = orderId ? decodeURIComponent(orderId) : undefined;
  const { ordersPayload, orderStatusAggregated } = useOrder();
  const orderStatuses = useAtomValue(orderStatusesState);
  const fallbackStatuses = Object.keys(orderStatusAggregated || {});
  const statusSource = orderStatuses.length ? orderStatuses : fallbackStatuses;
  const { orderStatusBoxes } = useOrderStatusBox(statusSource);
  const order = ordersPayload?.orders?.data?.find(
    (item) =>
      item.uuid === normalizedOrderId ||
      item.order_number === normalizedOrderId,
  );
  const statusItem = orderStatusBoxes.find((box) => {
    if (!box.status || !order?.status) {
      return false;
    }
    if (Array.isArray(box.status)) {
      return box.status.includes(order.status as (typeof box.status)[number]);
    }
    return box.status === order.status;
  });
  const trackingOrderRef = resolveTrackingOrderRef({
    orderUuid: order?.uuid,
    itemOrderUuid: order?.items?.[0]?.order_uuid,
    orderNumber: order?.order_number,
    routeOrderId: normalizedOrderId,
  });
  const hasTrackAction =
    statusItem?.action?.route === "/account/order/[id]/tracking";
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Order Details" />
      <ContentWrapper className="gap-y-4 bg-white px-3 py-2">
        {!order ? (
          <View className="py-6">
            <Text className="text-sm text-gray-500">Order not found.</Text>
          </View>
        ) : null}
        {order?.items?.map((item) => (
          <OrderedItem
            key={item.uuid}
            order={order}
            item={item}
            statusItem={statusItem}
          />
        ))}
        {order && !hasTrackAction && trackingOrderRef ? (
          <TouchableOpacity
            className="rounded-lg border border-primary px-4 py-2"
            onPress={() =>
              router.push({
                pathname: "/account/order/[id]/tracking",
                params: { id: encodeURIComponent(trackingOrderRef) },
              })
            }
          >
            <Text className="text-center text-primary">Track Order</Text>
          </TouchableOpacity>
        ) : null}
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
