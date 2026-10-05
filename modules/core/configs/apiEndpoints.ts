export type ApiEndpointUrls = {
  publicRootUrl: string;
  publicAuthUrl: string;
  publicConsumerUrl: string;
};

export type ApiEndpointSource = "explicit-override" | "expo-lan";

export type ApiEndpointResolution = {
  urls: ApiEndpointUrls;
  diagnostic: {
    platform: "android" | "ios";
    source: ApiEndpointSource;
    origin: string;
  } | null;
};

export type ResolveApiEndpointInput = {
  configuredUrls: ApiEndpointUrls;
  isDevelopment: boolean;
  platform: string;
  hostUri?: string | null;
  developmentOrigin?: string;
};

export type ApiEndpointResolutionErrorCode =
  "DEV_API_ENDPOINT_INVALID" | "DEV_API_ENDPOINT_UNRESOLVED";

export class ApiEndpointResolutionError extends Error {
  constructor(
    readonly code: ApiEndpointResolutionErrorCode,
    readonly category: string,
  ) {
    const guidance =
      code === "DEV_API_ENDPOINT_INVALID"
        ? "Set EXPO_PUBLIC_DEV_API_ORIGIN to a valid http(s) origin."
        : "Start Expo in LAN mode or set EXPO_PUBLIC_DEV_API_ORIGIN to a reachable http(s) origin.";

    super(`${code}: ${guidance} category=${category}`);
    this.name = "ApiEndpointResolutionError";
  }
}

const apiUrlsFromOrigin = (origin: string): ApiEndpointUrls => {
  const apiRoot = `${origin}/api/v1`;

  return {
    publicRootUrl: apiRoot,
    publicAuthUrl: `${apiRoot}/auth`,
    publicConsumerUrl: `${apiRoot}/consumers`,
  };
};

const parseUrl = (value: string): URL | null => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};

const isHttpOrigin = (url: URL): boolean =>
  (url.protocol === "http:" || url.protocol === "https:") &&
  url.hostname.length > 0 &&
  url.username.length === 0 &&
  url.password.length === 0 &&
  url.pathname === "/" &&
  url.search.length === 0 &&
  url.hash.length === 0 &&
  url.origin !== "null";

const resolveExplicitOrigin = (value: string): string => {
  const url = parseUrl(value.trim());

  if (!url || !isHttpOrigin(url)) {
    throw new ApiEndpointResolutionError("DEV_API_ENDPOINT_INVALID", "origin");
  }

  return url.origin;
};

const parseHostUri = (value: string): URL | null => {
  const trimmed = value.trim();
  const hasScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed);
  const input = hasScheme ? trimmed : `http://${trimmed}`;
  const url = parseUrl(input);

  if (!url || !isHttpOrigin(url)) {
    return null;
  }

  const authority = input
    .replace(/^[a-z][a-z\d+.-]*:\/\//i, "")
    .split(/[/?#]/, 1)[0];
  const rawHostname = authority.startsWith("[")
    ? authority.slice(0, authority.indexOf("]") + 1)
    : authority.replace(/:\d+$/, "");

  if (rawHostname !== url.hostname) {
    return null;
  }

  return url;
};

const parsePrivateIpv4 = (hostname: string): string[] | null => {
  if (!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)) {
    return null;
  }

  const octets = hostname.split(".");
  const values = octets.map(Number);

  if (values.some((octet) => octet < 0 || octet > 255)) {
    return null;
  }

  const [first, second] = values;
  const isPrivate =
    first === 10 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168);

  return isPrivate ? octets : null;
};

const resolveLanHost = (hostUri?: string | null): string => {
  if (!hostUri?.trim()) {
    throw new ApiEndpointResolutionError(
      "DEV_API_ENDPOINT_UNRESOLVED",
      "missing-host",
    );
  }

  const url = parseHostUri(hostUri);

  if (!url) {
    throw new ApiEndpointResolutionError(
      "DEV_API_ENDPOINT_UNRESOLVED",
      "malformed-host",
    );
  }

  const octets = parsePrivateIpv4(url.hostname);

  if (!octets) {
    throw new ApiEndpointResolutionError(
      "DEV_API_ENDPOINT_UNRESOLVED",
      "unsupported-host",
    );
  }

  return octets.join(".");
};

export function resolveApiEndpointUrls({
  configuredUrls,
  isDevelopment,
  platform,
  hostUri,
  developmentOrigin,
}: ResolveApiEndpointInput): ApiEndpointResolution {
  if (!isDevelopment || (platform !== "android" && platform !== "ios")) {
    return { urls: configuredUrls, diagnostic: null };
  }

  const source: ApiEndpointSource = developmentOrigin?.trim()
    ? "explicit-override"
    : "expo-lan";
  const origin = developmentOrigin?.trim()
    ? resolveExplicitOrigin(developmentOrigin)
    : (() => {
        const host = resolveLanHost(hostUri);
        const hostname = platform === "android" ? `${host}.nip.io` : host;

        return `http://${hostname}:3000`;
      })();

  return {
    urls: apiUrlsFromOrigin(origin),
    diagnostic: {
      platform,
      source,
      origin,
    },
  };
}
