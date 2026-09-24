import {
  authSessionAtom,
  authSessionEventAtom,
} from "@/modules/auth/atoms/authSessionAtom";
import { appStore } from "@/modules/core/utils/appStore";
import {
  clearAuthSession,
  logoutAuthSession,
  requireReauthSession,
  setAuthenticatedSession,
  syncSessionFromStorage,
} from "@/modules/auth/session/sessionController";
import { setStoredSession } from "@/modules/auth/utils/token";

jest.mock("@/modules/core/utils/secureStore", () => {
  const storage = new Map<string, string>();

  return {
    storage,
    setStorage: jest.fn(async (key: string, value: string) => {
      storage.set(key, value);
    }),
    retrieveStorage: jest.fn(async (key: string) => storage.get(key) ?? null),
    deleteStorage: jest.fn(async (key: string) => {
      storage.delete(key);
    }),
  };
});

const mockStore = (
  jest.requireMock("@/modules/core/utils/secureStore") as {
    storage: Map<string, string>;
  }
).storage;

describe("sessionController", () => {
  beforeEach(() => {
    mockStore.clear();
    appStore.set(authSessionAtom, {
      phase: "bootstrapping",
      token: null,
      user: null,
    });
    appStore.set(authSessionEventAtom, null);
  });

  it("bootstraps the runtime session from persisted storage", async () => {
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

    await syncSessionFromStorage();

    expect(appStore.get(authSessionAtom)).toEqual({
      phase: "authenticated",
      token: "token-123",
      user,
    });
  });

  it("publishes a login event when authentication succeeds", async () => {
    const user = {
      uuid: "11111111-1111-4111-8111-111111111111",
      authType: "email",
      name: "Bazarify User",
      email: "user@example.com",
      phone: null,
      phone_verified_at: null,
      email_verified_at: null,
    };

    await setAuthenticatedSession({
      token: "token-123",
      user,
      ttlMs: 1000,
    });

    expect(appStore.get(authSessionAtom)).toEqual({
      phase: "authenticated",
      token: "token-123",
      user,
    });
    expect(appStore.get(authSessionEventAtom)?.type).toBe("login_succeeded");
  });

  it("clears the runtime session to guest without emitting an event", async () => {
    await clearAuthSession();

    expect(appStore.get(authSessionAtom)).toEqual({
      phase: "guest",
      token: null,
      user: null,
    });
    expect(appStore.get(authSessionEventAtom)).toBeNull();
  });

  it("emits a logout completion event after logout", async () => {
    await logoutAuthSession();

    expect(appStore.get(authSessionAtom)).toEqual({
      phase: "guest",
      token: null,
      user: null,
    });
    expect(appStore.get(authSessionEventAtom)?.type).toBe("logout_completed");
  });

  it("moves the app into reauth-required state on forced expiry", async () => {
    await requireReauthSession();

    expect(appStore.get(authSessionAtom)).toEqual({
      phase: "reauth_required",
      token: null,
      user: null,
    });
    expect(appStore.get(authSessionEventAtom)?.type).toBe("session_expired");
  });
});
