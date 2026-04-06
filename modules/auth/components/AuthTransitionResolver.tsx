import { useEffect, useRef } from "react";
import {
  Href,
  usePathname,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import {
  authStatusAtom,
  AuthStatus,
} from "@/modules/auth/atoms/authStatusAtom";
import { authRouteHoldAtom } from "@/modules/auth/atoms/authRouteHoldAtom";
import {
  consumeAuthRedirect,
  isProtectedAuthRedirectTarget,
} from "@/modules/core/utils/authRedirect";
import { useSetAtom, useAtomValue } from "jotai";

const GUEST_HOME_PATH = "/(public)/(tabs)" as Href;
const AUTH_HOME_PATH = "/(public)/(tabs)" as Href;
const AUTH_ENTRY_PATH_PREFIXES = ["/auth", "/(public)/auth"] as const;
const PRIVATE_PATH_PREFIXES = [
  "/(private)/",
  "/account/editProfile",
  "/account/message",
  "/account/order",
  "/account/profile",
  "/account/setting",
  "/account/voucherCenter",
  "/cart/checkout",
  "/cart/payment",
  "/cart/paymentScreen/",
] as const;

type PendingTransition = {
  from: Exclude<AuthStatus, "unknown">;
  to: Exclude<AuthStatus, "unknown">;
};

function normalizeAuthenticatedIntent(target: string): Href {
  return target as Href;
}

function normalizePath(path: string | Href | null | undefined): string {
  if (!path) {
    return "";
  }

  const normalized =
    path === "/(public)/(tabs)" ? "/" : String(path).replace(/\/+$/, "");

  return normalized || "/";
}

function isPublicAuthEntryPath(path: string): boolean {
  const normalizedPath = normalizePath(path);

  return AUTH_ENTRY_PATH_PREFIXES.some(
    (prefix) =>
      normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  );
}

function isGuestInvalidPrivatePath(path: string): boolean {
  const normalizedPath = normalizePath(path);

  return PRIVATE_PATH_PREFIXES.some(
    (prefix) =>
      normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  );
}

export default function AuthTransitionResolver() {
  const authStatus = useAtomValue(authStatusAtom);
  const routeHold = useAtomValue(authRouteHoldAtom);
  const setRouteHold = useSetAtom(authRouteHoldAtom);
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

        if (!target) {
          setRouteHold(false);
          return;
        }

        if (normalizePath(pathname) === normalizePath(target)) {
          setRouteHold(false);
          return;
        }

        router.replace(target);
        setRouteHold(false);
      } finally {
        transitionInFlightRef.current = false;
      }
    };

    resolveTransition().then(() => undefined);
  }, [isNavReady, pathname, router, setRouteHold]);

  useEffect(() => {
    if (!isNavReady || routeHold || transitionInFlightRef.current) {
      return;
    }

    const normalizedPath = normalizePath(pathname);

    if (
      authStatus === "authenticated" &&
      isPublicAuthEntryPath(normalizedPath)
    ) {
      router.replace(AUTH_HOME_PATH);
      return;
    }

    if (authStatus === "guest" && isGuestInvalidPrivatePath(normalizedPath)) {
      router.replace(GUEST_HOME_PATH);
    }
  }, [authStatus, isNavReady, pathname, routeHold, router]);

  return null;
}
