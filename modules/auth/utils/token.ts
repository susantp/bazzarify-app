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
import { TUser, UserSchema } from "@/modules/auth/schemas/UserSchema";

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

export async function setStoredUser(user: TUser) {
  await setStorage(USER_KEY, JSON.stringify(user));
}

export async function getStoredUser(): Promise<TUser | null> {
  const raw = await retrieveStorage(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = UserSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      await deleteStorage(USER_KEY);
      return null;
    }

    return parsed.data;
  } catch {
    await deleteStorage(USER_KEY);
    return null;
  }
}

export async function setStoredSession({
  token,
  user,
  ttlMs = AUTH_TOKEN_TTL_MS,
}: {
  token: string;
  user: TUser;
  ttlMs?: number;
}) {
  await setAuthToken(token, ttlMs);
  await setStoredUser(user);
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

export async function getStoredSession(): Promise<{
  token: string;
  user: TUser | null;
} | null> {
  const token = await getAuthToken();

  if (!token) {
    return null;
  }

  return {
    token,
    user: await getStoredUser(),
  };
}
