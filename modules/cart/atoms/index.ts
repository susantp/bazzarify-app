// atoms/index.ts
import { atom } from "jotai";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";
import { LocationGeocodedAddress } from "expo-location";

export const cartAtom = atom<TAddCartPayload | null>(null);
export const selectedDeliveryAddress = atom<LocationGeocodedAddress | null>(
  null,
);
