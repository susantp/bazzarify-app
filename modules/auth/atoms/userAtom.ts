import { atom } from "jotai";
import { TUser } from "@/modules/auth/schemas/UserSchema";
import { authSessionAtom } from "@/modules/auth/atoms/authSessionAtom";

export const userAtom = atom<TUser | null>((get) => get(authSessionAtom).user);
