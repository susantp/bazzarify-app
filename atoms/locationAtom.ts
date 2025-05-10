import { atom } from "recoil";
import { LocationGeocodedAddress } from "expo-location";

export const latitudeAtom = atom<number | null>({
  key: "latitudeAtom",
  default: null,
});
export const longitudeAtom = atom<number | null>({
  key: "longitudeAtom",
  default: null,
});
export const geocodeAddressAtom = atom<LocationGeocodedAddress | null>({
  key: "geocodeAddressAtom",
  default: null,
});

export const locationErrorAtom = atom<string | null>({
  key: "locationErrorAtom",
  default: null,
});
