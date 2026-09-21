import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient } from "@tanstack/query-core";
import { authSessionAtom } from "@/modules/auth/atoms/authSessionAtom";
import useAuthSessionBootstrap from "@/modules/auth/hooks/useAuthSessionBootstrap";

export function useBootstrapApp({
  hasBootstrappedRef,
}: {
  hasBootstrappedRef?: MutableRefObject<boolean>;
} = {}) {
  const colorScheme = useColorScheme();
  const queryClient = useMemo(() => new QueryClient(), []);
  const session = useAtomValue(authSessionAtom);
  const [ready, setReady] = useState(session.phase !== "bootstrapping");

  useAuthSessionBootstrap();

  useEffect(() => {
    if (hasBootstrappedRef?.current) {
      setReady(true);
      return;
    }

    hasBootstrappedRef && (hasBootstrappedRef.current = true);
  }, [hasBootstrappedRef]);

  useEffect(() => {
    setReady(session.phase !== "bootstrapping");
  }, [session.phase]);

  return {
    ready,
    colorScheme,
    queryClient,
  };
}
