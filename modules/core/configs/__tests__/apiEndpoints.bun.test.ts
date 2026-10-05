import { describe, expect, it } from "bun:test";
import {
  ApiEndpointResolutionError,
  resolveApiEndpointUrls,
  type ApiEndpointUrls,
} from "../apiEndpoints";

const configuredUrls: ApiEndpointUrls = {
  publicRootUrl: "https://root.example/api/v1",
  publicAuthUrl: "https://auth.example/api/v1/auth",
  publicConsumerUrl: "https://consumer.example/api/v1/consumers",
};

const resolveNative = (
  platform: "android" | "ios",
  hostUri: string,
  developmentOrigin?: string,
) =>
  resolveApiEndpointUrls({
    configuredUrls,
    isDevelopment: true,
    platform,
    hostUri,
    developmentOrigin,
  });

describe("mobile development API endpoint resolution", () => {
  it("uses the same LAN host with Android nip.io and iOS raw IP", () => {
    const android = resolveNative("android", "192.168.254.24:8082");
    const ios = resolveNative("ios", "192.168.254.24:8082");

    expect(android.urls).toEqual({
      publicRootUrl: "http://192.168.254.24.nip.io:3000/api/v1",
      publicAuthUrl: "http://192.168.254.24.nip.io:3000/api/v1/auth",
      publicConsumerUrl: "http://192.168.254.24.nip.io:3000/api/v1/consumers",
    });
    expect(ios.urls).toEqual({
      publicRootUrl: "http://192.168.254.24:3000/api/v1",
      publicAuthUrl: "http://192.168.254.24:3000/api/v1/auth",
      publicConsumerUrl: "http://192.168.254.24:3000/api/v1/consumers",
    });
    expect(android.diagnostic?.origin).not.toContain("8082");
    expect(android.diagnostic?.source).toBe("expo-lan");
  });

  it("uses the current LAN input each time resolution runs", () => {
    const first = resolveNative("ios", "10.20.30.40:8082");
    const second = resolveNative("ios", "10.20.30.41:8082");

    expect(first.urls.publicConsumerUrl).toBe(
      "http://10.20.30.40:3000/api/v1/consumers",
    );
    expect(second.urls.publicConsumerUrl).toBe(
      "http://10.20.30.41:3000/api/v1/consumers",
    );
  });

  it.each([
    ["10/8", "10.1.2.3:8082"],
    ["172.16/12 lower edge", "172.16.0.1:8082"],
    ["172.16/12 upper edge", "172.31.255.254:8082"],
    ["192.168/16", "192.168.1.1:8082"],
  ])("accepts private IPv4 LAN range: %s", (_label, hostUri) => {
    expect(resolveNative("ios", hostUri).diagnostic?.source).toBe("expo-lan");
  });

  it.each([
    ["invalid octet", "192.168.1.256:8082", "malformed-host"],
    ["non-private 172 range", "172.15.0.1:8082", "unsupported-host"],
    ["public IPv4", "8.8.8.8:8082", "unsupported-host"],
    ["localhost", "localhost:8082", "unsupported-host"],
    ["loopback", "127.0.0.1:8082", "unsupported-host"],
    ["tunnel host", "example.ngrok.app:8082", "unsupported-host"],
    ["custom DNS", "consumer.local:8082", "unsupported-host"],
    ["IPv6", "[fd00::1]:8082", "unsupported-host"],
    ["credentials", "user:secret@192.168.1.2:8082", "malformed-host"],
    ["path", "192.168.1.2:8082/path", "malformed-host"],
    ["query", "192.168.1.2:8082?x=1", "malformed-host"],
  ])("rejects unsupported automatic host: %s", (_label, hostUri, category) => {
    try {
      resolveNative("android", hostUri);
      throw new Error("Expected endpoint resolution to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiEndpointResolutionError);
      expect(error).toMatchObject({
        code: "DEV_API_ENDPOINT_UNRESOLVED",
        category,
      });
    }
  });

  it("reports a missing Expo LAN host with stable guidance", () => {
    try {
      resolveApiEndpointUrls({
        configuredUrls,
        isDevelopment: true,
        platform: "ios",
        hostUri: null,
      });
      throw new Error("Expected endpoint resolution to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiEndpointResolutionError);
      expect(error).toMatchObject({
        code: "DEV_API_ENDPOINT_UNRESOLVED",
        category: "missing-host",
      });
      expect((error as Error).message).toContain("Start Expo in LAN mode");
    }
  });

  it("uses and normalizes a valid explicit origin on either platform", () => {
    for (const platform of ["android", "ios"] as const) {
      const result = resolveNative(
        platform,
        "192.168.1.1:8082",
        "https://remote.example:8443/",
      );

      expect(result.urls).toEqual({
        publicRootUrl: "https://remote.example:8443/api/v1",
        publicAuthUrl: "https://remote.example:8443/api/v1/auth",
        publicConsumerUrl: "https://remote.example:8443/api/v1/consumers",
      });
      expect(result.diagnostic).toEqual({
        platform,
        source: "explicit-override",
        origin: "https://remote.example:8443",
      });
    }
  });

  it("allows an explicit IPv6 origin without adding nip.io", () => {
    const result = resolveNative(
      "android",
      "192.168.1.1:8082",
      "http://[fd00::1]:3000",
    );

    expect(result.urls.publicConsumerUrl).toBe(
      "http://[fd00::1]:3000/api/v1/consumers",
    );
  });

  it.each([
    ["credentials", "http://user:secret@consumer.example:3000"],
    ["path", "http://consumer.example:3000/api/v1"],
    ["query", "http://consumer.example:3000?x=1"],
    ["fragment", "http://consumer.example:3000#section"],
    ["protocol", "ftp://consumer.example:3000"],
    ["malformed", "not a url"],
  ])("rejects an invalid explicit origin: %s", (_label, developmentOrigin) => {
    try {
      resolveNative("ios", "192.168.1.1:8082", developmentOrigin);
      throw new Error("Expected endpoint resolution to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiEndpointResolutionError);
      expect(error).toMatchObject({
        code: "DEV_API_ENDPOINT_INVALID",
        category: "origin",
      });
    }
  });

  it("preserves configured endpoints in production and on web", () => {
    const production = resolveApiEndpointUrls({
      configuredUrls,
      isDevelopment: false,
      platform: "android",
      hostUri: "192.168.1.1:8082",
      developmentOrigin: "not a URL",
    });
    const web = resolveApiEndpointUrls({
      configuredUrls,
      isDevelopment: true,
      platform: "web",
      hostUri: null,
      developmentOrigin: "not a URL",
    });

    expect(production.urls).toBe(configuredUrls);
    expect(web.urls).toBe(configuredUrls);
    expect(production.diagnostic).toBeNull();
    expect(web.diagnostic).toBeNull();
  });
});
