import {
  AuthSessionEventType,
  authSessionAtom,
  authSessionEventAtom,
  AuthSessionPhase,
} from "@/modules/auth/atoms/authSessionAtom";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import {
  clearAuthToken,
  getStoredSession,
  setStoredSession,
} from "@/modules/auth/utils/token";
import { clearAuthRedirect } from "@/modules/core/utils/authRedirect";
import { cartAtom, selectedDeliveryAddress } from "@/modules/cart/atoms";
import {
  addressDraftAtom,
  addressListAtom,
} from "@/modules/user/atoms/addresessAtom";
import { ordersState } from "@/modules/order/atoms/ordersState";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import { appStore } from "@/modules/core/utils/appStore";

const store = appStore;

function emitSessionEvent(type: AuthSessionEventType) {
  const current = store.get(authSessionEventAtom);
  store.set(authSessionEventAtom, {
    id: (current?.id ?? 0) + 1,
    type,
  });
}

function resetAuthenticatedDomainState() {
  store.set(cartAtom, null);
  store.set(selectedDeliveryAddress, null);
  store.set(addressListAtom, null);
  store.set(addressDraftAtom, null);
  store.set(ordersState, null);
  store.set(orderStatusesState, []);
}

function setGuestPhase(phase: Extract<AuthSessionPhase, "guest" | "reauth_required">) {
  resetAuthenticatedDomainState();
  store.set(authSessionAtom, {
    phase,
    token: null,
    user: null,
  });
}

export function beginAuthenticatingSession() {
  store.set(authSessionAtom, {
    phase: "authenticating",
    token: null,
    user: null,
  });
}

export async function setAuthenticatedSession({
  token,
  user,
  ttlMs,
}: {
  token: string;
  user: TUser;
  ttlMs?: number;
}) {
  await setStoredSession({ token, user, ttlMs });
  store.set(authSessionAtom, {
    phase: "authenticated",
    token,
    user,
  });
  emitSessionEvent("login_succeeded");
}

export async function clearAuthSession() {
  await clearAuthToken();
  setGuestPhase("guest");
}

export async function logoutAuthSession() {
  store.set(authSessionAtom, {
    phase: "logging_out",
    token: null,
    user: null,
  });
  await clearAuthRedirect();
  await clearAuthToken();
  setGuestPhase("guest");
  emitSessionEvent("logout_completed");
}

export async function requireReauthSession() {
  await clearAuthToken();
  setGuestPhase("reauth_required");
  emitSessionEvent("session_expired");
}

export async function syncSessionFromStorage() {
  const current = store.get(authSessionAtom);

  if (current.phase === "authenticating" || current.phase === "logging_out") {
    return current;
  }

  const storedSession = await getStoredSession();

  if (!storedSession) {
    setGuestPhase("guest");
    return store.get(authSessionAtom);
  }

  store.set(authSessionAtom, {
    phase: "authenticated",
    token: storedSession.token,
    user: storedSession.user,
  });

  return store.get(authSessionAtom);
}
