import { atom } from "jotai";
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

export const tokenAtom = atom<string | null>(null);

export const asyncToken = atom(null, async (get, set) =>
  set(tokenAtom, await retrieveStorage(AUTH_TOKEN_KEY)),
);
