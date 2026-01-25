// atoms/index.ts
import { atom } from "jotai";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";

export const cartAtom = atom<TAddCartPayload | null>(null);
export const selectedDeliveryAddress = atom<TUserAddress | null>(null);
