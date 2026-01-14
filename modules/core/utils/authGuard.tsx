import { ReactNode, useCallback, useState } from "react";
import { Href, useFocusEffect, usePathname, useRouter } from "expo-router";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import {
  consumeAuthRedirect,
  setAuthRedirect,
} from "@/modules/core/utils/authRedirect";
import { getAuthToken } from "@/modules/auth/utils/token";

interface AuthGuardProps {
  requireAuth: boolean;
  basePath: string;
  children: ReactNode;
}

export function AuthGuard({ requireAuth, basePath, children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const [checked, setChecked] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const finish = () => {
        if (active) setChecked(true);
      };

      const redirect = (to: Href) => {
        router.replace(to);
      };

      setChecked(false);

      (async () => {
        const token = await getAuthToken();
        if (!pathname.startsWith(basePath)) {
          finish();
          return;
        }
        const isGuestPath =
          pathname.startsWith("/guest") || pathname === "/login";
        /**
         * Case 1: Auth required, but user is NOT authenticated
         */
        if (requireAuth && !token) {
          if (!isGuestPath) {
            if (pathname) {
              await setAuthRedirect(pathname);
            }
            redirect("/guest/guestAccountIndex");
            return;
          }

          finish();
          return;
        }

        /**
         * Case 2: Auth NOT required, but user IS authenticated
         */
        if (!requireAuth && token) {
          if (!isGuestPath) {
            finish();
            return;
          }

          const target = (await consumeAuthRedirect()) || "/account/profile";

          if (target !== pathname) {
            redirect(target as Href);
            return;
          }

          finish();
          return;
        }

        /**
         * Case 3: All other valid scenarios
         */
        finish();
      })();

      return () => {
        active = false;
      };
    }, [requireAuth, pathname, router]),
  );

  if (!checked) {
    return <ThemedLoader />;
  }

  return <>{children}</>;
}
