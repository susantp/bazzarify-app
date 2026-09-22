jest.mock("expo-maps", () => {
  throw new Error("ExpoMaps native module is unavailable");
});

import { loadExpoMaps } from "@/modules/core/services/expoMapsRuntime";

describe("Expo Maps runtime adapter", () => {
  it("returns null when the installed client has no native ExpoMaps module", () => {
    expect(loadExpoMaps()).toBeNull();
  });
});
