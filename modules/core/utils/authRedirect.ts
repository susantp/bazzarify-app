import { deleteStorage, retrieveStorage, setStorage } from "@/modules/core/utils/secureStore";

const AUTH_REDIRECT_KEY = "auth_redirect_target";
const DEFAULT_TTL_MS = 5 * 60 * 1000;
const PROTECTED_ROUTE_PREFIXES = [
  "/(private)/",
  "/account/",
  "/account",
  "/cart/checkout",
  "/cart/payment",
  "/cart/paymentScreen/",
] as const;

type AuthRedirectPayload = {
  target: string;
  expiresAt: number;
};

export function isProtectedAuthRedirectTarget(
  target: string | null | undefined,
): target is string {
  if (!target || !target.startsWith("/")) {
    return false;
  }

  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => target === prefix || target.startsWith(prefix),
  );
}

export async function setAuthRedirect(
  target: string,
  ttlMs: number = DEFAULT_TTL_MS,
) {
  if (!isProtectedAuthRedirectTarget(target)) {
    await deleteStorage(AUTH_REDIRECT_KEY);
    return false;
  }
  const payload: AuthRedirectPayload = {
    target,
    expiresAt: Date.now() + ttlMs,
  };
  await setStorage(AUTH_REDIRECT_KEY, JSON.stringify(payload));
  return true;
}

export async function consumeAuthRedirect(): Promise<string | null> {
  const raw = await retrieveStorage(AUTH_REDIRECT_KEY);
  if (!raw) {
    return null;
  }
  try {
    const payload = JSON.parse(raw) as AuthRedirectPayload;

    if (
      !isProtectedAuthRedirectTarget(payload?.target) ||
      !payload?.expiresAt
    ) {
      await deleteStorage(AUTH_REDIRECT_KEY);
      return null;
    }
    if (Date.now() > payload.expiresAt) {
      await deleteStorage(AUTH_REDIRECT_KEY);
      return null;
    }
    await deleteStorage(AUTH_REDIRECT_KEY);
    return payload.target;
  } catch {
    await deleteStorage(AUTH_REDIRECT_KEY);
    return null;
  }
}
