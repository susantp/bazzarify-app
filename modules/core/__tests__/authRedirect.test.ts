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

const { consumeAuthRedirect, setAuthRedirect } = await import(
  "../utils/authRedirect"
);
const { retrieveStorage, setStorage } = await import(
  "@/modules/core/utils/secureStore"
);

describe("authRedirect", () => {
  beforeEach(() => {
    mockStore.clear();
  });

  it("stores and consumes the redirect target once", async () => {
    await setAuthRedirect("/cart/checkout");

    const first = await consumeAuthRedirect();
    const second = await consumeAuthRedirect();

    expect(first).toBe("/cart/checkout");
    expect(second).toBeNull();
  });

  it("returns null when the redirect is expired", async () => {
    await setAuthRedirect("/cart/checkout", -1);

    const result = await consumeAuthRedirect();

    expect(result).toBeNull();
  });

  it("cleans up malformed stored data", async () => {
    await setStorage("auth_redirect_target", "not-json");

    const result = await consumeAuthRedirect();
    const stillStored = await retrieveStorage("auth_redirect_target");

    expect(result).toBeNull();
    expect(stillStored).toBeNull();
  });

  it("ignores public routes that are not protected redirect targets", async () => {
    const stored = await setAuthRedirect("/cart");

    expect(stored).toBe(false);
    expect(await retrieveStorage("auth_redirect_target")).toBeNull();
  });
});
