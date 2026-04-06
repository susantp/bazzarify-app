import { useEffect, useRef } from "react";
import {
  Href,
  usePathname,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import { useAtomValue } from "jotai";
import {
  authStatusAtom,
  AuthStatus,
} from "@/modules/auth/atoms/authStatusAtom";
import {
  consumeAuthRedirect,
  isProtectedAuthRedirectTarget,
} from "@/modules/core/utils/authRedirect";

const GUEST_HOME_PATH = "/(public)/(tabs)" as Href;
const AUTH_HOME_PATH = "/(public)/(tabs)" as Href;

type PendingTransition = {
  from: Exclude<AuthStatus, "unknown">;
  to: Exclude<AuthStatus, "unknown">;
};

function normalizeAuthenticatedIntent(target: string): Href {
  return target as Href;
}

export default function AuthTransitionResolver() {
  const authStatus = useAtomValue(authStatusAtom);
  const router = useRouter();
  const pathname = usePathname();
  const navState = useRootNavigationState();
  const isNavReady = navState?.key != null;

  const previousAuthStatusRef = useRef<AuthStatus | null>(null);
  const pendingTransitionRef = useRef<PendingTransition | null>(null);
  const transitionInFlightRef = useRef(false);

  useEffect(() => {
    if (authStatus === "unknown") {
      return;
    }

    const previous = previousAuthStatusRef.current;

    // Ignore initial hydration transition (unknown -> guest/authenticated).
    // Initial landing is now structurally owned by root route and mounted trees.
    if (previous === null) {
      previousAuthStatusRef.current = authStatus;
      return;
    }

    if (previous === authStatus) {
      return;
    }

    previousAuthStatusRef.current = authStatus;

    if (previous === "guest" && authStatus === "authenticated") {
      pendingTransitionRef.current = { from: "guest", to: "authenticated" };
      return;
    }

    if (previous === "authenticated" && authStatus === "guest") {
      pendingTransitionRef.current = { from: "authenticated", to: "guest" };
      return;
    }

    pendingTransitionRef.current = null;
  }, [authStatus, pathname]);

  useEffect(() => {
    if (!isNavReady || transitionInFlightRef.current) {
      return;
    }

    const pendingTransition = pendingTransitionRef.current;
    if (!pendingTransition) {
      return;
    }

    const resolveTransition = async () => {
      transitionInFlightRef.current = true;

      try {
        let target: Href | null = null;

        if (
          pendingTransition.from === "guest" &&
          pendingTransition.to === "authenticated"
        ) {
          const redirectTarget = await consumeAuthRedirect();
          target = isProtectedAuthRedirectTarget(redirectTarget)
            ? normalizeAuthenticatedIntent(redirectTarget)
            : AUTH_HOME_PATH;
        } else if (
          pendingTransition.from === "authenticated" &&
          pendingTransition.to === "guest"
        ) {
          target = GUEST_HOME_PATH;
        }

        pendingTransitionRef.current = null;

        if (!target || pathname === target) {
          return;
        }

        router.replace(target);
      } finally {
        transitionInFlightRef.current = false;
      }
    };

    resolveTransition().then(() => undefined);
  }, [authStatus, isNavReady, pathname, router]);

  return null;
}
