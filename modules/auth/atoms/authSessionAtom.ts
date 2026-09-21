import { atom } from "jotai";
import { TUser } from "@/modules/auth/schemas/UserSchema";

export type AuthSessionPhase =
  | "bootstrapping"
  | "guest"
  | "authenticating"
  | "authenticated"
  | "logging_out"
  | "reauth_required";

export type AuthSessionState = {
  phase: AuthSessionPhase;
  token: string | null;
  user: TUser | null;
};

export type AuthSessionEventType =
  | "login_succeeded"
  | "logout_completed"
  | "session_expired";

export type AuthSessionEvent = {
  id: number;
  type: AuthSessionEventType;
};

export const authSessionAtom = atom<AuthSessionState>({
  phase: "bootstrapping",
  token: null,
  user: null,
});

export const authSessionEventAtom = atom<AuthSessionEvent | null>(null);
