import { atom } from "jotai";

export type AuthStatus = "unknown" | "authenticated" | "guest";

export const authStatusAtom = atom<AuthStatus>("unknown");

