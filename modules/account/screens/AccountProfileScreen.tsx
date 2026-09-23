import {
  Linking,
  RefreshControl,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import ProfileInfo from "@/components/account/profile/ProfileInfo";
import AccountHeader from "@/components/account/AccountHeader";
import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import OrderStatus from "@/components/account/profile/OrderStatus";
import useOrder from "@/modules/order/hooks/useOrder";
import useOrderStatusBox from "@/modules/order/hooks/useOrderStatusBox";
import { router } from "expo-router";
import { toTitleCase } from "@/modules/core/utils";
import formatOrderDate from "@/modules/order/utils/formatOrderDate";
import { useAtomValue } from "jotai";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import { FontAwesome5 } from "@expo/vector-icons";
import { Box, Icon, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export default function AccountProfileScreen() {
  const {
    user,
    ordersPayload,
    orderStatusAggregated,
    handleStatusPress,
    isRefreshing,
    refreshOrders,
  } = useOrder();
  const orderStatusGroups = useAtomValue(orderStatusesState);
  const { orderStatusBoxes } = useOrderStatusBox(orderStatusGroups);
  const theme = useBazarifyTheme();
  const recentOrders = ordersPayload?.orders?.data?.slice(0, 5) || [];
  const earnWithBazzarifyUrl = "https://vendor.bazarify.com.np/register";

  const handleEarnWithBazzarifyPress = async () => {
    await Linking.openURL(earnWithBazzarifyUrl);
  };

  return (
    <SafeAreaWrapper>
      <AccountHeader />
      <ScrollView
        style={[styles.scroll, { backgroundColor: theme.colors.surface }]}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshOrders} />
        }
      >
        <Box flex={1} gap="sm" padding="sm">
          <ProfileInfo user={user} />
          <OrderStatus
            orderStatuses={orderStatusBoxes}
            aggregates={orderStatusAggregated}
            onStatusPress={handleStatusPress}
            onViewAllPress={() => router.push("/account/order")}
          />
          <Box gap="sm" paddingX="sm" style={styles.recentSection}>
            <Text variant="title">Recent Orders</Text>
            {!recentOrders.length ? (
              <Text variant="bodyCompact" color="textMuted">
                No orders found.
              </Text>
            ) : null}
            {recentOrders.map((order) => (
              <Pressable
                key={order.uuid || order.order_number}
                accessibilityLabel={order.order_number}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.orderCard,
                  { borderColor: theme.colors.border },
                  pressed && styles.pressed,
                ]}
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
                  style={styles.orderDate}
                >
                  {formatOrderDate(order.placed_at, "LLL d, yyyy")}
                </Text>
              </Pressable>
            ))}
          </Box>
          <Box
            gap="lg"
            paddingX="sm"
            style={[
              styles.earnSection,
              { borderTopColor: theme.colors.border },
            ]}
          >
            <Text variant="heading">Earn with Bazzarify</Text>
            <Pressable
              accessibilityLabel="Earn With Bazzarify"
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.earnAction,
                { borderColor: theme.colors.borderStrong },
                pressed && styles.pressed,
              ]}
              onPress={handleEarnWithBazzarifyPress}
            >
              <Icon size={20} color="primary">
                {({ color, size }) => (
                  <FontAwesome5 name="rupee-sign" size={size} color={color} />
                )}
              </Icon>
              <Text variant="title">Earn With Bazzarify</Text>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  earnAction: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  earnSection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 16,
  },
  orderCard: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
  },
  orderDate: { marginTop: 4 },
  pressed: { opacity: 0.76 },
  recentSection: { marginTop: 16 },
  scroll: { flex: 1 },
});
