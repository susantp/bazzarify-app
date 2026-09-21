import { atom } from "jotai";
import { authSessionAtom } from "@/modules/auth/atoms/authSessionAtom";

export const authRouteHoldAtom = atom((get) => {
  const phase = get(authSessionAtom).phase;

  return (
    phase === "bootstrapping" ||
    phase === "authenticating" ||
    phase === "logging_out"
  );
});
