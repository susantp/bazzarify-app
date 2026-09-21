import { atom } from "jotai";
import { authSessionAtom } from "@/modules/auth/atoms/authSessionAtom";

export const tokenAtom = atom<string | null>((get) => get(authSessionAtom).token);
