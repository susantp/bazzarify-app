import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { ordersState } from "@/modules/order/atoms/ordersState";
import { ProfileMenuBoxType } from "@/modules/order/types";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function useOrder() {
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);
  const ordersPayload = useAtomValue(ordersState);
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
    router.push(`/account/order?statusId=${id}`);

  const isStatusMatch = (
    statusFilter: string | string[] | undefined,
    orderStatus: string,
  ) => {
    if (!statusFilter) {
      return false;
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
    setIsRefreshing(true);
    try {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["account", "orders"],
          exact: true,
          type: "active",
        }),
        queryClient.refetchQueries({
          queryKey: ["account", "order-statuses"],
          exact: true,
          type: "active",
        }),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient]);

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
