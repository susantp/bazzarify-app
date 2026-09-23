import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { RefreshControl, ScrollView, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Box, PageContent, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import useOrderStatusBox from "@/modules/order/hooks/useOrderStatusBox";
import useOrder from "@/modules/order/hooks/useOrder";
import { toTitleCase } from "@/modules/core/utils";
import formatOrderDate from "@/modules/order/utils/formatOrderDate";
import resolveOrderStatusSelection from "@/modules/order/utils/resolveOrderStatusSelection";
import { useAtomValue } from "jotai";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";

export default function Page() {
  const theme = useBazarifyTheme();
  const { statusId } = useLocalSearchParams();
  const { getFilteredOrder, isRefreshing, refreshOrders } = useOrder();
  const orderStatusGroups = useAtomValue(orderStatusesState);
  const { orderStatusBoxes } = useOrderStatusBox(orderStatusGroups);
  const availableStatusIds = orderStatusBoxes.map(
    (orderStatus) => orderStatus.id,
  );
  const selectedStatusId = resolveOrderStatusSelection({
    routeStatusId: statusId,
    currentStatus: null,
    availableStatuses: availableStatusIds,
  });

  const statusItem = orderStatusBoxes.find(
    (orderStatus) => orderStatus.id === selectedStatusId,
  );
  const filteredOrders = getFilteredOrder(statusItem) || [];
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Your Order" />
      <PageContent
        backgroundColor="surface"
        gap="lg"
        paddingX="sm"
        paddingY="sm"
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshOrders}
            />
          }
          contentContainerStyle={{ rowGap: theme.spacing.lg }}
        >
          <Box direction="row" gap="sm" style={{ flexWrap: "wrap" }}>
            {orderStatusBoxes.map((orderStatus) => (
              <Pressable
                key={orderStatus.id}
                accessibilityRole="button"
                accessibilityLabel={orderStatus.label}
                onPress={() =>
                  router.replace({
                    pathname: "/account/order",
                    params: { statusId: orderStatus.id },
                  })
                }
                style={{
                  borderColor: theme.colors.borderStrong,
                  borderRadius: theme.radii.lg,
                  borderWidth: 1,
                  flexDirection: "row",
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                }}
              >
                <Text
                  color={
                    selectedStatusId === orderStatus.id ? "primary" : "text"
                  }
                  variant="bodyCompact"
                >
                  {orderStatus.label}
                </Text>
              </Pressable>
            ))}
          </Box>
          {!filteredOrders.length ? (
            <Text variant="bodyCompact" color="textMuted">
              No orders found.
            </Text>
          ) : null}
          {filteredOrders.map((order) => (
            <Pressable
              key={order.uuid || order.order_number}
              style={{
                borderColor: theme.colors.border,
                borderRadius: theme.radii.lg,
                borderWidth: 1,
                padding: theme.spacing.lg,
              }}
              onPress={() =>
                router.push({
                  pathname: "/account/order/[id]",
                  params: {
                    id: encodeURIComponent(order.uuid || order.order_number),
                  },
                })
              }
            >
              <Box direction="row" align="center" justify="space-between">
                <Text variant="bodyMedium">{order.order_number}</Text>
                <Text variant="bodyCompact" color="textMuted">
                  {toTitleCase(order.status.replace(/_/g, " "))}
                </Text>
              </Box>
              <Text
                variant="bodyCompact"
                color="textMuted"
                style={{ marginTop: theme.spacing.xs }}
              >
                {formatOrderDate(order.placed_at, "LLL d, yyyy")}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </PageContent>
    </SafeAreaWrapper>
  );
}
