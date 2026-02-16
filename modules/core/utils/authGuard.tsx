import { ReactNode, useCallback, useRef, useState } from "react";
import { useFocusEffect, usePathname, useRouter } from "expo-router";
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

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
  const redirectedRef = useRef(false);
  const [checked, setChecked] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      redirectedRef.current = false;
      setChecked(false);

      (async () => {
        const token = await retrieveStorage(AUTH_TOKEN_KEY);
        const inScope = isPathWithinBase(pathname, basePath);
        const shouldRedirectToGuest = requireAuth && !token;
        const shouldRedirectToAccount = !requireAuth && !!token && inScope;

        if (
          !redirectedRef.current &&
          (shouldRedirectToGuest || shouldRedirectToAccount)
        ) {
          redirectedRef.current = true;
          router.replace(
            shouldRedirectToGuest
              ? "/guest/guestAccountIndex"
              : "/account/profile",
          );
        }

        if (active) {
          setChecked(true);
        }
      })();

      return () => {
        active = false;
      };
    }, [basePath, pathname, requireAuth, router]),
  );

  if (!checked) {
    return <ThemedLoader />;
  }

  return <>{children}</>;
}
