import { atom } from "recoil";
import * as Location from "expo-location";

export const locationAtom = atom<Location.LocationObject | null>({
  key: "locationAtom",
  default: null,
});
