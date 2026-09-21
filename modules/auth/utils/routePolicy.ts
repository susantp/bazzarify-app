import { Href } from "expo-router";

export const GUEST_HOME_PATH = "/(public)/(tabs)" as Href;
export const AUTH_HOME_PATH = "/(public)/(tabs)" as Href;
export const LOGIN_ROUTE = "/auth/login" as Href;

const AUTH_ENTRY_PATH_PREFIXES = ["/auth", "/(public)/auth"] as const;
const PRIVATE_PATH_PREFIXES = [
  "/(private)/",
  "/account/editProfile",
  "/account/message",
  "/account/order",
  "/account/profile",
  "/account/setting",
  "/account/voucherCenter",
  "/cart/checkout",
  "/cart/payment",
  "/cart/paymentScreen/",
] as const;

export function normalizeAuthPath(path: string | Href | null | undefined): string {
  if (!path) {
    return "";
  }

  const strippedPath = String(path).replace(/\/+$/, "");
  const normalized = strippedPath === GUEST_HOME_PATH ? "/" : strippedPath;

  return normalized || "/";
}

export function isAuthEntryPath(path: string | Href | null | undefined): boolean {
  const normalizedPath = normalizeAuthPath(path);

  return AUTH_ENTRY_PATH_PREFIXES.some(
    (prefix) =>
      normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  );
}

export function isPrivatePath(path: string | Href | null | undefined): boolean {
  const normalizedPath = normalizeAuthPath(path);

  return PRIVATE_PATH_PREFIXES.some(
    (prefix) =>
      normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  );
}
