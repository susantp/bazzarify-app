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
    await clearAuthToken();
    return null;
  }
  if (Date.now() > expiresAt) {
    await clearAuthToken();
    return null;
  }
  return token;
}
