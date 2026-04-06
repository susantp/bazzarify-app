import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
  const recentOrders = ordersPayload?.orders?.data?.slice(0, 4) || [];

  return (
    <SafeAreaWrapper>
      <AccountHeader />
      <ScrollView
        className="flex-1 bg-white"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshOrders} />
        }
      >
        <View className="flex-1 flex-col px-2 py-2">
          <ProfileInfo user={user} />
          <OrderStatus
            orderStatuses={orderStatusBoxes}
            aggregates={orderStatusAggregated}
            onStatusPress={handleStatusPress}
            onViewAllPress={() => router.push("/account/order")}
          />
          <View className="mt-4 gap-y-2 px-2">
            <Text className="text-lg font-semibold">Recent Orders</Text>
            {!recentOrders.length ? (
              <Text className="text-sm text-gray-500">No orders found.</Text>
            ) : null}
            {recentOrders.map((order) => (
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
