import { atom } from "jotai";
import { Dimensions } from "react-native";

export const screenDimensionAtom = atom({
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
});
