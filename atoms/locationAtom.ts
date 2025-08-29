import { atom } from "jotai";
import { LocationGeocodedAddress } from "expo-location";

export const latitudeAtom = atom<number | null>(null);
export const longitudeAtom = atom<number | null>(null);
export const geocodeAddressAtom = atom<LocationGeocodedAddress | null>(null);

export const locationErrorAtom = atom<string | null>(null);
