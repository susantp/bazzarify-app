import { atom } from "jotai";
import { authSessionAtom } from "@/modules/auth/atoms/authSessionAtom";

export type AuthStatus = "unknown" | "authenticated" | "guest";

export const authStatusAtom = atom<AuthStatus>((get) => {
  const phase = get(authSessionAtom).phase;

  if (phase === "bootstrapping") {
    return "unknown";
  }

  if (phase === "authenticated") {
    return "authenticated";
  }

  return "guest";
});

