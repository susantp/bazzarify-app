import { Stack } from "expo-router";
import { AuthGuard } from "@/modules/core/utils/authGuard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { ordersState } from "@/modules/order/atoms/ordersState";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import actionGetOrders from "@/modules/order/actions/actionGetOrders";
import actionGetOrderStatuses from "@/modules/order/actions/actionGetOrderStatuses";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";

const Layout = () => {
  const authStatus = useAtomValue(authStatusAtom);
  const token = useAtomValue(tokenAtom);
  const isAuthenticated = authStatus === "authenticated";
  const setOrders = useSetAtom(ordersState);
  const setOrderStatuses = useSetAtom(orderStatusesState);
  const { data } = useQuery({
    queryKey: ["account", "orders"],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      return actionGetOrders(token);
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
  const { data: statuses } = useQuery({
    queryKey: ["account", "order-statuses"],
    queryFn: async () => {
      if (!token) {
        return [];
      }
      return actionGetOrderStatuses(token);
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setOrders(data ?? null);
  }, [data, setOrders]);
  useEffect(() => {
    setOrderStatuses(statuses ?? []);
  }, [setOrderStatuses, statuses]);

  return (
    <AuthGuard requireAuth={true}>
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="editProfile" options={{ headerShown: false }} />
        <Stack.Screen name="setting" options={{ headerShown: false }} />
        <Stack.Screen name="order/index" options={{ headerShown: false }} />
        <Stack.Screen name="order/[status]" options={{ headerShown: false }} />
        <Stack.Screen
          name="order/[id]/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="order/[id]/tracking"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="order/[id]/return"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="voucherCenter" options={{ headerShown: false }} />
        <Stack.Screen name="message/index" options={{ headerShown: false }} />
        <Stack.Screen name="message/inbox" options={{ headerShown: false }} />
        <Stack.Screen
          name="message/activities"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="message/promotions"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthGuard>
  );
};

export default Layout;
