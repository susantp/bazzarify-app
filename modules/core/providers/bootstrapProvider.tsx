import { ReactNode } from "react";
import useAuthSessionBootstrap from "@/modules/auth/hooks/useAuthSessionBootstrap";

export default function BootstrapProvider({
  children,
}: {
  children: ReactNode;
}) {
  useAuthSessionBootstrap();

  return <>{children}</>;
}
