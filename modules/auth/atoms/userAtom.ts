import { atom } from "jotai";
import { TUser } from "@/modules/auth/schemas/UserSchema";

export const userAtom = atom<TUser | null>(null);
