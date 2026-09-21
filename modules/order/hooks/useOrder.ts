import { router } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { ordersState } from "@/modules/order/atoms/ordersState";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { useCallback, useState } from "react";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import hydrateOrderSummary from "@/modules/order/utils/hydrateOrderSummary";

export default function useOrder() {
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const ordersPayload = useAtomValue(ordersState);
  const setOrders = useSetAtom(ordersState);
  const setOrderStatuses = useSetAtom(orderStatusesState);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const orderStatusAggregated: Record<string, { count: number }> | undefined =
    ordersPayload?.orders?.data?.reduce<Record<string, { count: number }>>(
      (acc, order) => {
        if (!acc[order.status]) {
          acc[order.status] = { count: 0 };
        }
        acc[order.status].count += 1;
        return acc;
      },
      {},
    );
  const handleStatusPress = (id: string) =>
    router.push({
      pathname: "/account/order",
      params: { statusId: id },
    });

  const isStatusMatch = (
    statusFilter: string | string[] | undefined,
    orderStatus: string,
  ) => {
    if (!statusFilter) {
      return true;
    }
    if (Array.isArray(statusFilter)) {
      return statusFilter.includes(orderStatus);
    }
    return statusFilter === orderStatus;
  };

  const getItemsByStatus = (type: ProfileMenuBoxType) => {
    console.log("type: ", type);
  };
  const getFilteredOrder = (statusItem: ProfileMenuBoxType | undefined) =>
    ordersPayload?.orders?.data
      ?.filter((order) => isStatusMatch(statusItem?.status, order.status))
      .flatMap((order) => order);
  const refreshOrders = useCallback(async () => {
    if (!token) {
      setOrders(null);
      setOrderStatuses([]);
      return;
    }

    setIsRefreshing(true);
    try {
      await hydrateOrderSummary({
        token,
        setOrders,
        setOrderStatuses,
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [setOrderStatuses, setOrders, token]);

  return {
    user,
    orderStatusAggregated,
    ordersPayload,
    isLoading: false,
    isRefreshing,
    refreshOrders,
    handleStatusPress,
    getItemsByStatus,
    getFilteredOrder,
  };
}
