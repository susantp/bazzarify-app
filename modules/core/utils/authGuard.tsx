import { ReactNode, useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { retrieveToken } from "@/modules/core/utils/secureStore";
import ThemedLoader from "@/modules/core/components/ThemedLoader";

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
  const [checked, setChecked] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setChecked(false);
      (async () => {
        const token = await retrieveToken("token");
        if (requireAuth && !token) {
          router.replace("/guest/guestAccountIndex");
        } else if (!requireAuth && token) {
          router.replace("/account/profile");
        }
        if (active) {
          setChecked(true);
        }
      })();
      return () => {
        active = false;
      };
    }, [requireAuth, router]),
  );

  if (!checked) {
    return <ThemedLoader />;
  }

  return <>{children}</>;
}
