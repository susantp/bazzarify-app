import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { ordersState } from "@/modules/order/atoms/ordersState";
import { ProfileMenuBoxType } from "@/modules/order/types";

export default function useOrder() {
  const user = useAtomValue(userAtom);
  const ordersPayload = useAtomValue(ordersState);
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
    handleStatusPress,
    getItemsByStatus,
    getFilteredOrder,
  };
}
