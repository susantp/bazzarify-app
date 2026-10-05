import { describe, expect, it, mock } from "bun:test";

mock.module("expo-constants", () => ({
  default: { expoConfig: { hostUri: "10.70.80.90:8082" } },
}));
mock.module("react-native", () => ({ Platform: { OS: "ios" } }));

Object.defineProperty(globalThis, "__DEV__", {
  configurable: true,
  value: true,
});
process.env.EXPO_PUBLIC_DEV_API_ORIGIN = "";

const resolutionMessages: string[] = [];
const originalInfo = console.info;
console.info = (...messages: unknown[]) => {
  resolutionMessages.push(messages.map(String).join(" "));
};
const { app } = await import("../app");
console.info = originalInfo;

describe("app API endpoint adapter", () => {
  it("adapts Expo hostUri and Platform.OS once at app configuration load", () => {
    expect(app.publicRootUrl).toBe("http://10.70.80.90:3000/api/v1");
    expect(app.publicAuthUrl).toBe("http://10.70.80.90:3000/api/v1/auth");
    expect(app.publicConsumerUrl).toBe(
      "http://10.70.80.90:3000/api/v1/consumers",
    );
    expect(resolutionMessages).toEqual([
      "[DEV_API_ENDPOINT_RESOLVED] platform=ios source=expo-lan origin=http://10.70.80.90:3000",
    ]);
  });
});
