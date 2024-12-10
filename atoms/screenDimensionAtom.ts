import { atom } from "recoil";
import { Dimensions } from "react-native";

export const screenDimensionAtom = atom({
  key: "screenDimensionAtom",
  default: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
