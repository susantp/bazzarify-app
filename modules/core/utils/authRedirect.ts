import { deleteStorage, retrieveStorage, setStorage } from "@/modules/core/utils/secureStore";

const AUTH_REDIRECT_KEY = "auth_redirect_target";
const DEFAULT_TTL_MS = 5 * 60 * 1000;

type AuthRedirectPayload = {
  target: string;
  expiresAt: number;
};

export async function setAuthRedirect(
  target: string,
  ttlMs: number = DEFAULT_TTL_MS,
) {
  if (!target) {
    return;
  }
  const payload: AuthRedirectPayload = {
    target,
    expiresAt: Date.now() + ttlMs,
  };
  await setStorage(AUTH_REDIRECT_KEY, JSON.stringify(payload));
}

export async function consumeAuthRedirect(): Promise<string | null> {
  const raw = await retrieveStorage(AUTH_REDIRECT_KEY);
  if (!raw) {
    return null;
  }
  try {
    const payload = JSON.parse(raw) as AuthRedirectPayload;

    if (!payload?.target || !payload?.expiresAt) {
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
