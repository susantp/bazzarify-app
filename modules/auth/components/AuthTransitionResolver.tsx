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
import { consumeAuthRedirect } from "@/modules/core/utils/authRedirect";

const GUEST_HOME_PATH: Href = "/(guest)/guestAccountIndex";
const AUTH_HOME_PATH: Href = "/(app)/(tabs)/account/profile";

type PendingTransition = {
  from: Exclude<AuthStatus, "unknown">;
  to: Exclude<AuthStatus, "unknown">;
};

function isValidAuthRedirect(target: string | null): target is string {
  return Boolean(
    target &&
      target.startsWith("/") &&
      !target.startsWith("/guest") &&
      !target.startsWith("/(guest)"),
  );
}

function normalizeAuthenticatedIntent(target: string): Href {
  if (target.startsWith("/(app)/")) {
    return target as Href;
  }

  if (
    target.startsWith("/products") ||
    target.startsWith("/vendor") ||
    target.startsWith("/+not-found")
  ) {
    return target as Href;
  }

  if (
    target === "/" ||
    target === "/index" ||
    target.startsWith("/account") ||
    target.startsWith("/cart") ||
    target.startsWith("/categories") ||
    target.startsWith("/search")
  ) {
    const suffix = target === "/" ? "/index" : target;
    return (`/(app)/(tabs)${suffix}` as Href);
  }

  return target as Href;
}

export default function AuthTransitionResolver() {
  const authStatus = useAtomValue(authStatusAtom);
  const router = useRouter();
  const pathname = usePathname();
  const navState = useRootNavigationState();
  const isNavReady = navState?.key != null;
  console.log("RESOLVER_RENDER", { authStatus, pathname, isNavReady });

  const previousAuthStatusRef = useRef<AuthStatus | null>(null);
  const pendingTransitionRef = useRef<PendingTransition | null>(null);
  const transitionInFlightRef = useRef(false);

  useEffect(() => {
    if (authStatus === "unknown") {
      return;
    }

    const previous = previousAuthStatusRef.current;

    // Ignore initial hydration transition (unknown -> guest/authenticated).
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
  }, [authStatus]);

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
          target = isValidAuthRedirect(redirectTarget)
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
  }, [isNavReady, pathname, router]);

  return null;
}
