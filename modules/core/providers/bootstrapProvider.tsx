import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { useBootstrapApp } from "@/modules/core/hooks/useBootstrapApp";
import { useRef } from "react";
import { ReactNode } from "react";

export default function BootstrapProvider({
  children,
}: {
  children: ReactNode;
}) {
  const hasBootstrappedRef = useRef(false);
  const { ready } = useBootstrapApp({ hasBootstrappedRef });

  if (!ready) {
    return <ThemedLoader />;
  }

  return <>{children}</>;
}
