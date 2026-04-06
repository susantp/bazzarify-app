import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { authRouteHoldAtom } from "@/modules/auth/atoms/authRouteHoldAtom";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { cartAtom, selectedDeliveryAddress } from "@/modules/cart/atoms";
import {
  AUTH_TOKEN_EXPIRES_AT_KEY,
  AUTH_TOKEN_KEY,
  AUTH_TOKEN_TTL_MS,
  USER_KEY,
} from "@/modules/auth/config";
import {
  deleteStorage,
  retrieveStorage,
  setStorage,
} from "@/modules/core/utils/secureStore";
import { getDefaultStore } from "jotai";
import {
  addressListAtom,
  addressDraftAtom,
} from "@/modules/user/atoms/addresessAtom";
import { ordersState } from "@/modules/order/atoms/ordersState";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { clearAuthRedirect } from "@/modules/core/utils/authRedirect";

export async function setAuthToken(token: string, ttlMs = AUTH_TOKEN_TTL_MS) {
  const expiresAt = Date.now() + ttlMs;
  await setStorage(AUTH_TOKEN_KEY, token);
  await setStorage(AUTH_TOKEN_EXPIRES_AT_KEY, String(expiresAt));
}

export async function clearAuthToken() {
  await deleteStorage(AUTH_TOKEN_KEY);
  await deleteStorage(AUTH_TOKEN_EXPIRES_AT_KEY);
  await deleteStorage(USER_KEY);
}

export async function setAuthenticatedSession({
  token,
  user,
  ttlMs = AUTH_TOKEN_TTL_MS,
}: {
  token: string;
  user: TUser;
  ttlMs?: number;
}) {
  await setAuthToken(token, ttlMs);
  await setStorage(USER_KEY, JSON.stringify(user));

  const store = getDefaultStore();
  store.set(tokenAtom, token);
  store.set(userAtom, user);
  store.set(authStatusAtom, "authenticated");
}

export function clearAuthState() {
  const store = getDefaultStore();
  const currentStatus = store.get(authStatusAtom);
  if (currentStatus === "authenticated") {
    store.set(authRouteHoldAtom, true);
  }
  store.set(tokenAtom, null);
  store.set(userAtom, null);
  store.set(cartAtom, null);
  store.set(selectedDeliveryAddress, null);
  store.set(addressListAtom, null);
  store.set(addressDraftAtom, null);
  store.set(ordersState, null);
  store.set(orderStatusesState, []);
  store.set(authStatusAtom, "guest");
}

export async function clearAuthSession() {
  await clearAuthToken();
  clearAuthState();
}

export async function logoutAuthSession() {
  await clearAuthRedirect();
  await clearAuthSession();
}

export async function getAuthToken(): Promise<string | null> {
  const token = await retrieveStorage(AUTH_TOKEN_KEY);
  if (!token) {
    return null;
  }
  const expiresAtRaw = await retrieveStorage(AUTH_TOKEN_EXPIRES_AT_KEY);
  if (!expiresAtRaw) {
    return token;
  }
  const expiresAt = Number(expiresAtRaw);
  if (Number.isNaN(expiresAt)) {
    await clearAuthSession();
    return null;
  }
  if (Date.now() > expiresAt) {
    await clearAuthSession();
    return null;
  }
  return token;
}
