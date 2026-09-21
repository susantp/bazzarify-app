import { beforeEach, describe, expect, it, mock } from "bun:test";

const mockStore = new Map<string, string>();

mock.module("@/modules/core/utils/secureStore", () => ({
  setStorage: (key: string, value: string) => {
    mockStore.set(key, value);
    return Promise.resolve();
  },
  retrieveStorage: (key: string) => {
    return Promise.resolve(mockStore.get(key) ?? null);
  },
  deleteStorage: (key: string) => {
    mockStore.delete(key);
    return Promise.resolve();
  },
}));

const {
  clearAuthToken,
  getAuthToken,
  getStoredSession,
  getStoredUser,
  setAuthToken,
  setStoredSession,
} = await import(
  "@/modules/auth/utils/token"
);
const { retrieveStorage, setStorage } = await import(
  "@/modules/core/utils/secureStore"
);
const {
  AUTH_TOKEN_EXPIRES_AT_KEY,
  AUTH_TOKEN_KEY,
  USER_KEY,
} = await import("@/modules/auth/config");

describe("token utils", () => {
  beforeEach(() => {
    mockStore.clear();
  });

  it("stores token with expiry and returns it when valid", async () => {
    await setAuthToken("token-123", 1000);

    const token = await getAuthToken();
    const storedToken = await retrieveStorage(AUTH_TOKEN_KEY);
    const storedExpiry = await retrieveStorage(AUTH_TOKEN_EXPIRES_AT_KEY);

    expect(token).toBe("token-123");
    expect(storedToken).toBe("token-123");
    expect(typeof storedExpiry).toBe("string");
  });

  it("clears token when expired", async () => {
    await setAuthToken("token-123", -1);
    const token = await getAuthToken();

    expect(token).toBeNull();
    expect(await retrieveStorage(AUTH_TOKEN_KEY)).toBeNull();
    expect(await retrieveStorage(AUTH_TOKEN_EXPIRES_AT_KEY)).toBeNull();
  });

  it("clears token and user on logout", async () => {
    await setStorage(AUTH_TOKEN_KEY, "token-123");
    await setStorage(AUTH_TOKEN_EXPIRES_AT_KEY, String(Date.now() + 1000));
    await setStorage(USER_KEY, "user-data");

    await clearAuthToken();

    expect(await retrieveStorage(AUTH_TOKEN_KEY)).toBeNull();
    expect(await retrieveStorage(AUTH_TOKEN_EXPIRES_AT_KEY)).toBeNull();
    expect(await retrieveStorage(USER_KEY)).toBeNull();
  });

  it("stores and restores the persisted session payload", async () => {
    const user = {
      uuid: "11111111-1111-4111-8111-111111111111",
      authType: "email",
      name: "Bazarify User",
      email: "user@example.com",
      phone: null,
      phone_verified_at: null,
      email_verified_at: null,
    };

    await setStoredSession({
      token: "token-123",
      user,
      ttlMs: 1000,
    });

    expect(await getStoredUser()).toEqual(user);
    expect(await getStoredSession()).toEqual({
      token: "token-123",
      user,
    });
  });

  it("drops malformed stored users without invalidating the token", async () => {
    await setAuthToken("token-123", 1000);
    await setStorage(USER_KEY, "not-json");

    expect(await getStoredUser()).toBeNull();
    expect(await getStoredSession()).toEqual({
      token: "token-123",
      user: null,
    });
    expect(await retrieveStorage(USER_KEY)).toBeNull();
  });
});
