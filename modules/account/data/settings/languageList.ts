import { ImageSourcePropType } from "react-native";

export type LanguageType = {
  id: string;
  label: string;
  imgSource: ImageSourcePropType;
  default: boolean;
};
export const languageList: LanguageType[] = [
  {
    id: "nepali",
    label: "Nepali",
    imgSource: require("@/assets/images/flagNepal.png"),
    default: false,
  },
  {
    id: "english",
    label: "English",
    imgSource: require("@/assets/images/flagEnglish.png"),
    default: true,
  },
];
