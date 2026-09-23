import React from "react";
import { Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Box, PageContent, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import useOrder from "@/modules/order/hooks/useOrder";
import useOrderStatusBox from "@/modules/order/hooks/useOrderStatusBox";
import OrderedItem from "@/components/account/order/OrderedItem";
import resolveTrackingOrderRef from "@/modules/order/utils/resolveTrackingOrderRef";
import { useAtomValue } from "jotai";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";

export default function OrderDetailsPage() {
  const theme = useBazarifyTheme();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const orderId = Array.isArray(id) ? id[0] : id;
  const normalizedOrderId = orderId ? decodeURIComponent(orderId) : undefined;
  const { ordersPayload } = useOrder();
  const orderStatusGroups = useAtomValue(orderStatusesState);
  const { orderStatusBoxes } = useOrderStatusBox(orderStatusGroups);
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
      <PageContent
        backgroundColor="surface"
        gap="lg"
        paddingX="sm"
        paddingY="sm"
      >
        {!order ? (
          <Box paddingY="xxl">
            <Text variant="bodyCompact" color="textMuted">
              Order not found.
            </Text>
          </Box>
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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Track Order"
            style={{
              borderColor: theme.colors.primary,
              borderRadius: theme.radii.lg,
              borderWidth: 1,
              paddingHorizontal: theme.spacing.lg,
              paddingVertical: theme.spacing.sm,
            }}
            onPress={() =>
              router.push({
                pathname: "/account/order/[id]/tracking",
                params: { id: encodeURIComponent(trackingOrderRef) },
              })
            }
          >
            <Text align="center" color="primary">
              Track Order
            </Text>
          </Pressable>
        ) : null}
      </PageContent>
    </SafeAreaWrapper>
  );
}
