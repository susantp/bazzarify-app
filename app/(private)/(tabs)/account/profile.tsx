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
import { useAtomValue } from "jotai";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import formatOrderDate from "@/modules/order/utils/formatOrderDate";

export default function Page() {
  const {
    user,
    ordersPayload,
    orderStatusAggregated,
    handleStatusPress,
    isRefreshing,
    refreshOrders,
  } = useOrder();
  const orderStatuses = useAtomValue(orderStatusesState);
  const fallbackStatuses = Object.keys(orderStatusAggregated || {});
  const statusSource = orderStatuses.length ? orderStatuses : fallbackStatuses;
  const { orderStatusBoxes } = useOrderStatusBox(statusSource);
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
        {/*<View className="my-6 h-0.5 bg-slate-200" />*/}
        {/*<View className="flex-row flex-wrap gap-y-6">*/}
        {/*  {otherMenus.map(({ id, icon, label, routeTo }) => (*/}
        {/*    <TouchableOpacity*/}
        {/*      className="w-1/4 flex-col items-center gap-y-1"*/}
        {/*      key={randomUUID()}*/}
        {/*      onPress={() => routeTo && router.push(routeTo)}*/}
        {/*    >*/}
        {/*      {icon}*/}
        {/*      <Text className="text-sm">{label}</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*  ))}*/}
        {/*</View>*/}
        {/*<View className="my-6 h-0.5 bg-slate-200" />*/}
        {/*<View className="flex-col gap-y-4">*/}
        {/*  <Text className="text-xl">Earn with Bazzarify</Text>*/}
        {/*  <View className="flex-row gap-x-6 rounded-lg border border-slate-400 px-5 py-4">*/}
        {/*    <FontAwesome5*/}
        {/*      name="rupee-sign"*/}
        {/*      size={24}*/}
        {/*      color={Colors.light.tint}*/}
        {/*    />*/}
        {/*    <Text className="text-xl">Earn with bazzarify</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </ScrollView>
    </SafeAreaWrapper>
  );
}
