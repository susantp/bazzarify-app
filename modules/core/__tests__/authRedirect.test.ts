import { consumeAuthRedirect, setAuthRedirect } from "../utils/authRedirect";
import { retrieveStorage, setStorage } from "@/modules/core/utils/secureStore";

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
