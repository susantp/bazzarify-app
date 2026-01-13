import { ReactNode, useCallback, useState } from "react";
import { Href, useFocusEffect, usePathname, useRouter } from "expo-router";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import {
  consumeAuthRedirect,
  setAuthRedirect,
} from "@/modules/core/utils/authRedirect";
import { getAuthToken } from "@/modules/auth/utils/token";

interface AuthGuardProps {
  /**
   * If `requireAuth` is true, users without a token go to guest.
   * If false, users _with_ a token go to account.
   */
  requireAuth: boolean;
  children: ReactNode;
}

export function AuthGuard({ requireAuth, children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  useFocusEffect(
    useCallback(() => {
      let active = true;
      setChecked(false);
      (async () => {
        const token = await getAuthToken();
        if (requireAuth && !token) {
          if (pathname && !pathname.startsWith("/guest")) {
            await setAuthRedirect(pathname);
          }
          router.replace("/guest/guestAccountIndex");
        } else if (!requireAuth && token) {
          const target = await consumeAuthRedirect();
          const destination = (target || "/account/profile") as Href;
          router.replace(destination);
        }
        if (active) {
          setChecked(true);
        }
      })();
      return () => {
        active = false;
      };
    }, [requireAuth, router, pathname]),
  );

  if (!checked) {
    return <ThemedLoader />;
  }

  return <>{children}</>;
}
