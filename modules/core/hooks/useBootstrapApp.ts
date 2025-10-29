import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { bootstrapApp } from "@/modules/core/utils/bootstrap";
import { subscribeOnResume } from "@/modules/core/utils";
import { createTokenTask } from "@/modules/auth/boot/tokenTask";
import { splashTask } from "@/modules/core/boot/splashTask";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient } from "@tanstack/query-core";
import { createCartTask } from "@/modules/auth/boot/cartTask";
import { cartAtom } from "@/modules/cart/atoms";
import createAddressesTask from "@/modules/auth/boot/createAddressesTask";
import { addressListAtom } from "@/modules/user/atoms/addresessAtom";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { createUserTask } from "@/modules/auth/boot/userTask";
import { createOrderTask } from "@/modules/order/boot/orderTask";
import { ordersState } from "@/modules/order/atoms/ordersState";

export function useBootstrapApp() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const setToken = useSetAtom(tokenAtom);
  const setCart = useSetAtom(cartAtom);
  const setAddresses = useSetAtom(addressListAtom);
  const setUser = useSetAtom(userAtom);
  const setConsumerOrders = useSetAtom(ordersState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const run = async () => {
      await bootstrapApp([
        createTokenTask(setToken),
        createUserTask(setUser),
        createCartTask(setCart),
        createAddressesTask(setAddresses),
        createOrderTask(setConsumerOrders),
        splashTask,
        // plug more tasks later
      ]);
      if (active) setReady(true);
    };

    run().then(() => undefined);
    const unsubscribe = subscribeOnResume(run);
    return () => {
      active = false;
      unsubscribe();
    };
  }, [setAddresses, setCart, setToken]);

  return {
    ready,
    colorScheme,
    queryClient,
  };
}
