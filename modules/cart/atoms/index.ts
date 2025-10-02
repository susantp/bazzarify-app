// atoms/index.ts
import { atom } from "jotai";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";

export const cartAtom = atom<TAddCartPayload | null>(null);
