import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
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

export function useBootstrapApp({
  hasBootstrappedRef,
}: {
  hasBootstrappedRef?: MutableRefObject<boolean>;
} = {}) {
  const colorScheme = useColorScheme();
  const queryClient = useMemo(() => new QueryClient(), []);
  const setToken = useSetAtom(tokenAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const setCart = useSetAtom(cartAtom);
  const setAddresses = useSetAtom(addressListAtom);
  const setUser = useSetAtom(userAtom);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    if (hasBootstrappedRef?.current) {
      setReady(true);
      return () => {
        active = false;
      };
    }

    hasBootstrappedRef && (hasBootstrappedRef.current = true);

    const run = async () => {
      console.log("BOOTSTRAP_START");
      await bootstrapApp([
        // auth status must resolve before guarded stacks mount
        createTokenTask(setToken, setAuthStatus),
        createUserTask(setUser),
        createCartTask(setCart),
        createAddressesTask(setAddresses),
        splashTask,
        // plug more tasks later
      ]);
      if (active) {
        console.log("BOOTSTRAP_READY");
        setReady(true);
      }
    };

    run().then(() => undefined);
    const unsubscribe = subscribeOnResume(run);
    return () => {
      active = false;
      unsubscribe();
    };
  }, [setAddresses, setAuthStatus, setCart, setToken, setUser]);

  return {
    ready,
    colorScheme,
    queryClient,
  };
}
