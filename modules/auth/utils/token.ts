import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { authRouteHoldAtom } from "@/modules/auth/atoms/authRouteHoldAtom";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { userAtom } from "@/modules/auth/atoms/userAtom";
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

export function clearAuthState() {
  const store = getDefaultStore();
  const currentStatus = store.get(authStatusAtom);
  if (currentStatus === "authenticated") {
    store.set(authRouteHoldAtom, true);
  }
  store.set(tokenAtom, null);
  store.set(userAtom, null);
  console.log("AUTH_STATUS_SET(guest)");
  store.set(authStatusAtom, "guest");
}

export async function clearAuthSession() {
  await clearAuthToken();
  clearAuthState();
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
