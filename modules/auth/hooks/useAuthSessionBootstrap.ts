import { useEffect } from "react";
import { hideSplash, subscribeOnResume } from "@/modules/core/utils";
import { syncSessionFromStorage } from "@/modules/auth/session/sessionController";

export default function useAuthSessionBootstrap() {
  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      await syncSessionFromStorage();

      if (isMounted) {
        await hideSplash();
      }
    };

    bootstrap().then(() => undefined);

    const unsubscribe = subscribeOnResume(() => {
      syncSessionFromStorage().then(() => undefined);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);
}
