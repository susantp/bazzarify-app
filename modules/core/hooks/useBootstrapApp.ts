import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { bootstrapApp } from "@/modules/core/utils/bootstrap";
import { subscribeOnResume } from "@/modules/core/utils";
import { createTokenTask } from "@/modules/auth/boot/tokenTask";
import { splashTask } from "@/modules/core/boot/splashTask";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient } from "@tanstack/query-core";
import { AppState } from "react-native";
import { createCartTask } from "@/modules/auth/boot/cartTask";
import { cartAtom } from "@/modules/cart/atoms";

export function useBootstrapApp() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const setToken = useSetAtom(tokenAtom);
  const setCart = useSetAtom(cartAtom);
  const [ready, setReady] = useState(false);

  console.log("app state in useEffect: ", AppState.currentState);
  useEffect(() => {
    let active = true;

    const run = async () => {
      await bootstrapApp([
        createTokenTask(setToken),
        createCartTask(setCart),
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
  }, [setCart, setToken]);

  return {
    ready,
    colorScheme,
    queryClient,
  };
}
