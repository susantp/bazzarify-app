import {
  isAuthEntryPath,
  isPrivatePath,
  normalizeAuthPath,
} from "@/modules/auth/utils/routePolicy";

describe("routePolicy", () => {
  it("normalizes the public root path consistently", () => {
    expect(normalizeAuthPath("/(public)/(tabs)")).toBe("/");
    expect(normalizeAuthPath("/(public)/(tabs)/")).toBe("/");
  });

  it("identifies auth-entry routes from both mounted path forms", () => {
    expect(isAuthEntryPath("/auth/login")).toBe(true);
    expect(isAuthEntryPath("/(public)/auth/login")).toBe(true);
    expect(isAuthEntryPath("/cart/checkout")).toBe(false);
  });

  it("identifies private capability routes from a single source", () => {
    expect(isPrivatePath("/cart/checkout")).toBe(true);
    expect(isPrivatePath("/account/order/history")).toBe(true);
    expect(isPrivatePath("/(public)/(tabs)")).toBe(false);
  });
});
