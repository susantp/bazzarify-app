import { router } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { ordersState } from "@/modules/order/atoms/ordersState";
import { ProfileMenuBoxType } from "@/modules/order/types";
import hydrateOrders from "@/modules/order/utils/hydrateOrders";

export default function useOrder() {
  const user = useAtomValue(userAtom);
  const ordersPayload = useAtomValue(ordersState);
  const setOrders = useSetAtom(ordersState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ordersPayload || isLoading) {
      return;
    }
    setIsLoading(true);
    hydrateOrders(setOrders).finally(() => {
      setIsLoading(false);
    });
  }, [isLoading, ordersPayload, setOrders]);

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

  const getItemsByStatus = (type: ProfileMenuBoxType) => {
    console.log("type: ", type);
  };
  const getFilteredOrder = (statusItem: ProfileMenuBoxType | undefined) =>
    ordersPayload?.orders?.data
      ?.filter((order) => order.status === statusItem?.status)
      .flatMap((order) => order);
  return {
    user,
    orderStatusAggregated,
    ordersPayload,
    isLoading,
    handleStatusPress,
    getItemsByStatus,
    getFilteredOrder,
  };
}
