import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { bootstrapApp } from "@/modules/core/utils/bootstrap";
import { subscribeOnResume } from "@/modules/core/utils";
import { createTokenTask } from "@/modules/auth/boot/tokenTask";
import { splashTask } from "@/modules/core/boot/splashTask";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient } from "@tanstack/query-core";

export function useBootstrapApp() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const setToken = useSetAtom(tokenAtom);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const run = async () => {
      await bootstrapApp([
        createTokenTask(setToken),
        splashTask,
        // plug more tasks later
      ]);
      if (active) setReady(true);
    };

    run().then(() => undefined);
    const unsubscribe = subscribeOnResume(run);
    console.log("hydration complete, token set");
    return () => {
      active = false;
      unsubscribe();
    };
  }, [setToken]);

  return {
    ready,
    colorScheme,
    queryClient,
  };
}
