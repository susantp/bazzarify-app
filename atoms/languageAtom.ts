import { atom, selector } from "recoil";
import {
  languageList,
  LanguageType,
} from "@/components/account/setting/data/languageList";

export const languageAtom = atom<LanguageType[]>({
  key: "language",
  default: languageList,
});

export const filteredDefaultLanguage = selector<LanguageType[]>({
  key: "filterDefaultLanguage",
  get: ({ get }) => {
    const list = get(languageAtom);
    return list.filter((item) => item.default);
  },
});
