import { ReactNode } from "react";

interface AuthGuardProps {
  requireAuth: boolean;
  children: ReactNode;
  basePath?: string;
}

export function AuthGuard({ children }: AuthGuardProps) {
  return <>{children}</>;
}
