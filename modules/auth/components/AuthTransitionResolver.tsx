import { useEffect, useRef } from "react";
import {
  Href,
  usePathname,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import {
  consumeAuthRedirect,
  isProtectedAuthRedirectTarget,
} from "@/modules/core/utils/authRedirect";
import { useAtomValue } from "jotai";
import {
  authSessionAtom,
  authSessionEventAtom,
} from "@/modules/auth/atoms/authSessionAtom";
import {
  AUTH_HOME_PATH,
  GUEST_HOME_PATH,
  isAuthEntryPath,
  isPrivatePath,
  normalizeAuthPath,
} from "@/modules/auth/utils/routePolicy";

export default function AuthTransitionResolver() {
  const session = useAtomValue(authSessionAtom);
  const sessionEvent = useAtomValue(authSessionEventAtom);
  const router = useRouter();
  const pathname = usePathname();
  const navState = useRootNavigationState();
  const isNavReady = navState?.key != null;
  const lastHandledEventIdRef = useRef(0);

  useEffect(() => {
    if (!isNavReady || !sessionEvent) {
      return;
    }

    if (sessionEvent.id === lastHandledEventIdRef.current) {
      return;
    }

    if (sessionEvent.type !== "login_succeeded") {
      lastHandledEventIdRef.current = sessionEvent.id;
      return;
    }

    const resolveTransition = async () => {
      const redirectTarget = await consumeAuthRedirect();
      const target = isProtectedAuthRedirectTarget(redirectTarget)
        ? (redirectTarget as Href)
        : AUTH_HOME_PATH;

      lastHandledEventIdRef.current = sessionEvent.id;

      if (normalizeAuthPath(pathname) === normalizeAuthPath(target)) {
        return;
      }

      router.replace(target);
    };

    resolveTransition().then(() => undefined);
  }, [isNavReady, pathname, router, sessionEvent]);

  useEffect(() => {
    if (!isNavReady) {
      return;
    }

    const normalizedPath = normalizeAuthPath(pathname);

    if (
      session.phase === "authenticated" &&
      isAuthEntryPath(normalizedPath)
    ) {
      if (normalizedPath !== normalizeAuthPath(AUTH_HOME_PATH)) {
        router.replace(AUTH_HOME_PATH);
      }
      return;
    }

    if (
      (session.phase === "guest" || session.phase === "reauth_required") &&
      isPrivatePath(normalizedPath) &&
      normalizedPath !== normalizeAuthPath(GUEST_HOME_PATH)
    ) {
      router.replace(GUEST_HOME_PATH);
      return;
    }
  }, [isNavReady, pathname, router, session.phase]);

  return null;
}
