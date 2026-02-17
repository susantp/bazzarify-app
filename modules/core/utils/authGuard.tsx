import { ReactNode, useEffect, useRef } from "react";
import { usePathname, useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";

interface AuthGuardProps {
  /**
   * If `requireAuth` is true, users without a token go to guest.
   * If false, users _with_ a token go to account.
   */
  requireAuth: boolean;
  children: ReactNode;
  /**
   * Optional route scope. Redirect checks only run when active pathname
   * is inside this base path.
   */
  basePath?: string;
}

function isPathWithinBase(pathname: string, basePath?: string) {
  if (!basePath) {
    return true;
  }

  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

export function AuthGuard({ requireAuth, children, basePath }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const authStatus = useAtomValue(authStatusAtom);
  const redirectedToRef = useRef<string | null>(null);

  useEffect(() => {
    if (authStatus === "unknown") {
      return;
    }

    const inScope = isPathWithinBase(pathname, basePath);
    const shouldRedirectToGuest =
      requireAuth && authStatus !== "authenticated";
    const shouldRedirectToAccount =
      !requireAuth && authStatus === "authenticated" && inScope;
    const target = shouldRedirectToGuest
      ? "/guest/guestAccountIndex"
      : shouldRedirectToAccount
        ? "/account/profile"
        : null;

    if (!target) {
      redirectedToRef.current = null;
      return;
    }

    if (redirectedToRef.current === target) {
      return;
    }

    redirectedToRef.current = target;
    router.replace(target);
  }, [authStatus, basePath, pathname, requireAuth, router]);

  if (authStatus === "unknown") {
    return null;
  }

  return <>{children}</>;
}
